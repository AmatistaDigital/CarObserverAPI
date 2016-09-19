echo 'building application ...'
cd ..
ls
tar -czvf CarObserverAPI.tar.gz CarObserverAPI
scp CarObserverAPI.tar.gz root@104.131.150.56:/root/
ssh root@104.131.150.56 tar -xzvf /root/CarObserverAPI.tar.gz
echo 'done building this'
