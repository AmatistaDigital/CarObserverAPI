echo 'building application ...'
cd ..
tar -czvf CarObserverAPI.tar.gz CarObserverAPI
scp CarObserverAPI.tar.gz root@104.131.150.56:~/CarObserverAPI
ssh root@104.131.150.56 tar -xzvf ~/CarObserverAPI/CarObserverAPI.tar.gz
echo 'done building this'
