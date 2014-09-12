#!/bin/sh
ansible-playbook -i development.ini sql-server.yml -K --vault-password-file ~/.vault_pass.txt
