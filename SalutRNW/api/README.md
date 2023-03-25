# Api

# Commsnds
run.cmd - start local databse in docker
build.cmd - Backend project

docker build -t devatk11/reacteverywhereapi:v1 .
docker run --rm -it -p 8080:80 -e "MessageBroker__Host=amqps://yrmqdmfn:qBmLiPoUXCqc1QyCnX3ey2AiwAxjPXnL@hawk.rmq.cloudamqp.com/yrmqdmfn" -e "MessageBroker__Username=yrmqdmfn" -e "MessageBroker__Password=qBmLiPoUXCqc1QyCnX3ey2AiwAxjPXnL" -e "Config__PublishProductEvents=false" -e "XApiKey=secret-api-key" -e "ConnectionStrings__Database=Host=mouse.db.elephantsql.com;Port=5432;Database=gilnwoui;Username=gilnwoui;Password=EfopMPqtwvUfC-2DWUB3IMCH0atywG7R;Include Error Detail=true" devatk11/reacteverywhereapi:v1

http://localhost:8080

#Docker 
hub: devatk11

# Publish image to docker hub
docker login
docker push devatk11/reacteverywhereapi:v1

#Deploy
Deployed to https://fly.io/

fly auth login
fly launch --image devatk11/reacteverywhereapi:v1

fly secrets list
fly secrets set Key=Value

flyctl deploy
fly logs -a reacteverywhereapi


#Queue
https://www.cloudamqp.com/


# DATABASE
ReactEverywhere
Server	mouse.db.elephantsql.com (mouse-01)
Region	amazon-web-services::eu-north-1
Created at	2023-03-25 11:43 UTC+00:00
User & Default database	gilnwoui
Password EfopMPqtwvUfC-2DWUB3IMCH0atywG7R
URL postgres://gilnwoui:EfopMPqtwvUfC-2DWUB3IMCH0atywG7R@mouse.db.elephantsql.com/gilnwoui