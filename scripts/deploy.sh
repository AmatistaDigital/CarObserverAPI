echo 'building application ...'
cd ..
ls
tar -czvf CarObserverAPI.tar.gz CarObserverAPI
scp CarObserverAPI.tar.gz root@104.131.150.56:~/
ssh root@104.131.150.56 tar -xzvf ~/CarObserverAPI.tar.gz
echo 'done building this'
