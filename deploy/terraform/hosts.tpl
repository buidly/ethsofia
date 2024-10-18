[validators]
%{ for idx, instance in validators ~}
validator-${idx} ansible_host=${instance.network_interface[0].access_config[0].nat_ip} ansible_user=${ssh_user} validator_index=${idx}
%{ endfor ~}
