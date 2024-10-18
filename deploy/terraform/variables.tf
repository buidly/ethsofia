variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
}

variable "zone" {
  description = "The GCP zone"
  type        = string
}

variable "ssh_username" {
  description = "The SSH username to connect to the instances"
  type        = string
}

variable "ssh_public_key_path" {
  description = "The path to the SSH public key"
  type        = string
}

variable "validator_count" {
  description = "Number of validator instances to create"
  type        = number
}

variable "vpc_network_name" {
  description = "Name of the existing VPC network"
  type        = string
}

variable "boot_disk_size" {
  description = "Boot disk size in GB"
  type        = number
}

variable "machine_type" {
  description = "Machine type for the instances"
  type        = string
}

variable "image" {
  description = "The image to use for the instances"
  type        = string
}

# The name of the subnetwork within the VPC
variable "subnetwork_name" {
  description = "The name of the subnetwork to use for the instances"
  type        = string
}
