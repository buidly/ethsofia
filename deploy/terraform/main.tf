provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

data "google_compute_image" "ubuntu" {
  family  = "ubuntu-2204-lts" 
  project = "ubuntu-os-cloud"
}

data "google_compute_network" "vpc_network" {
  name = var.vpc_network_name
}

data "google_compute_subnetwork" "subnetwork" {
  name   = var.subnetwork_name
  region = var.region
}

resource "google_compute_instance" "validator_instances" {
  count        = var.validator_count
  name         = "validator-${count.index}"
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = data.google_compute_image.ubuntu.self_link
      size  = var.boot_disk_size
      type  = "pd-standard"
    }
  }

  network_interface {
    network    = data.google_compute_network.vpc_network.self_link
    subnetwork = data.google_compute_subnetwork.subnetwork.self_link
    access_config {}
  }

  tags = ["validator"]

  metadata = {
    ssh-keys = "${var.ssh_username}:${file(var.ssh_public_key_path)}"
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y git
  EOT
  
}

resource "local_file" "ansible_inventory" {
  content  = templatefile("${path.module}/hosts.tpl", {
    validators   = google_compute_instance.validator_instances,
    ssh_user     = var.ssh_username
  })
  filename = "${path.module}/hosts.ini"
}