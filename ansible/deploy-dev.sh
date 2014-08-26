#!/bin/sh
ansible-playbook -i development.ini master.yml -K --vault-password-file ~/.vault_pass.txt
