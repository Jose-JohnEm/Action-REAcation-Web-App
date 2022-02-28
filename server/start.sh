


ip=$(/sbin/ip route|awk '/default/ { print $3 }')

echo $ip

curli=$(curl -X GET "localhost:4040/api/tunnels/command_line/" | python -c "import sys,json; print json.load(sys.stdin)['public_url']")
echo "\nGHWB_URI=$curli" >> .env