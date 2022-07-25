
# Project Week 7: Deploying to-do list frontend microservice on a cloud cluster

## Introduction
As of now, you have completed Project Week 6 and should now have an understanding of the regular development of a fully functional to-do-list Application. For Project Week 7, you will go through the process of understanding containerising the microservice and process of deploying the to-do-list frontend microservice component on a IBM cloud cluster.

## Containerizing microservice
- Developing in microservices is the art of breaking down the old model of building one large application, i.e. a “monolithic” application, and forming a new model where specialized, cloud-hosted sub applications—each charged with a very specific task—work together. For this, we have added a `frontendserver.js` using express.
- Containers are a standard way to package an application and all its dependencies so that it can be moved between environments and run without change. Docker is one of the most popular Containerization platforms which allows you to develop, deploy, and run application inside containers. We have created a Dockerfile to containerize the to-do-list frontend application. **Note** : Below commands are just for your understanding.
- We have then built the docker image and tagged it using below command.
```
docker build -f Dockerfile -t ibmaccelerate/cloudnative:frontend_v1 .
```
- Image is pushed to docker hub. You will be using this already built image to deploy on your cluster.

## Prerequisites
+ Create IBM cloud ID using the instructions and IBM Cloud Feature Code shared via email.
+ **Optional:**: Below is required only if you would like to deploy the application from your local terminal.
  - Install kubectl on your machine using instructions [**here**](https://kubectl.docs.kubernetes.io/installation/kubectl/)
  - If you would like to run the install instructions from your local machine terminal window, you would need to install `IBM cloud CLI` using Steps 1 to step 3 instructions [**here**](https://cloud.ibm.com/docs/containers?topic=containers-cs_cli_install)

## Instructions

### Deploy and configure kubernetes service cluster from IBM cloud catalog

1. Login to [cloud.ibm.com](https://cloud.ibm.com) using your IBM cloud ID.

3. Go to the IBM cloud catalog and search for kubernetes service.

<img width="1431" alt="Screen Shot 2022-07-25 at 9 56 51 AM" src="https://media.github.ibm.com/user/32795/files/1f1ed100-0c00-11ed-9065-e5298e28b895">

4. Deploy kubernetes service by providing clustername, selecting the free plan to create a kubernetes cluster.

<img width="1435" alt="Screen Shot 2022-07-25 at 10 14 15 AM" src="https://media.github.ibm.com/user/32795/files/9ce3dc00-0c02-11ed-9e4a-6b6ef329ceac">

6. Once the deployment is complete and cluster is ready,  Open the `IBM cloud shell` from the header options.
<img width="1438" alt="Screen Shot 2022-07-25 at 10 18 56 AM" src="https://media.github.ibm.com/user/32795/files/6bb7db80-0c03-11ed-9c2f-44d3ee89e537">

**Note:** If you would like to access the cluster anytime later access it by going to the left hamburger menu --> Resource List --> Select your clustername under clusters.

<img width="386" alt="Screen Shot 2022-07-25 at 11 31 04 AM" src="https://media.github.ibm.com/user/32795/files/4760fc80-0c0d-11ed-8f96-9f595d85b15c">

<img width="506" alt="Screen Shot 2022-07-25 at 11 31 21 AM" src="https://media.github.ibm.com/user/32795/files/5182fb00-0c0d-11ed-8f74-63b2acfcb176">

8. Connect to the cluster for deploying the to-do-list frontend application by following instructions from ```Connect via CLI``` from Actions drop down.

<img width="692" alt="Screen Shot 2022-07-25 at 10 22 38 AM" src="https://media.github.ibm.com/user/32795/files/b76a8500-0c03-11ed-880d-de384099a449">

<img width="772" alt="Screen Shot 2022-07-25 at 10 24 24 AM" src="https://media.github.ibm.com/user/32795/files/f698d600-0c03-11ed-9ca1-b2194f19e219">

10. You can run the `connect via CLI` instructions in your `IBM cloud shell` which you have opened earlier (or) optionally from your terminal window. **Note:** If you are going to run the instructions from the terminal window then you would need ibmcloud CLI and kubectl installed on your machine mentioned optional in `Prerequisite` section of this document.


### Deploy Todo List APP (Front-End) microservice of kubernetes cluster

#### Deploy the application from `IBM cloud shell` of your deployed kubernetes cluster.
1. Go to the `IBM cloud shell` and connect to the cluster by following the instructions from ```Connect via CLI``` from Actions drop down from the instructions above.
2. Once the above step is complete, clone the to-do-list week7 project on your `IBM cloud shell`.

   ``` git clone to-do-list-project-URL```

   If you have issues cloning the github project, follow the below steps on your `IBM cloud shell`.
     - Create a folder for deployment manifests.

       ```mkdir deployment-templates```

     - Create the todolist deployment and service templates inside the above created folder.
     - Create todolist-deployment.yaml and copy the contents from project and save.

          ```
          cat << "EOF" > deployment-templates/todolist-deployment.yaml
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: to-do-list
            labels:
              app: to-do-list
          spec:
            selector:
              matchLabels:
                app: to-do-list
            replicas: 1
            template:
              metadata:
                labels:
                  app: to-do-list
              spec:
                containers:
                - name: to-do-list
                  image: ibmaccelerate/cloudnative:frontend_v1
                  imagePullPolicy: Always
                  ports:
                  - containerPort: 8080
                    name: https
                    protocol: TCP
          EOF
          ```
    - Create todolist-service.yaml and copy the contents from project and save.

          ```
          cat << "EOF" > deployment-templates/todolist-service.yaml
          apiVersion: v1
          kind: Service
          metadata:
            name: todolist-service
          spec:
            type: NodePort
            # Each Pod in the Deployment that you created previously has below label. So the Pods in the Deployment will become members of this Service.
            selector:
              app: to-do-list
            ports:
                # By default and for convenience, the `targetPort` is set to the same value as the `port` field.
              - port: 8080
                targetPort: 8080
                # Optional field
                # By default and for convenience, the Kubernetes control plane will allocate a port from a range (default: 30000-32767)
                nodePort: 30007
          EOF
          ```
**Note** : Frontend deployment image `ibmaccelerate/cloudnative:frontend_v1` can be found in the `todolist-deployment.yaml` file.

3. Deploy the to-do-list frontend application on your cluster using kubectl on your `IBM cloud shell`
   - Create the deployment. Execute the below command from `deployment-templates` directory.
     ```
     kubectl apply -f todolist-deployment.yaml
     ```
   - Validate if the deployment is running with below commands.

     ```
     kubectl get deployments
     ```
     Output will look something like below.
     ```
     NAME         READY   UP-TO-DATE   AVAILABLE   AGE
     to-do-list   1/1     1            1           31m
     ```

     ```
     kubectl get pods
     ```
     Output will look something like below.
     ```
     NAME                          READY   STATUS    RESTARTS   AGE
     to-do-list-786468885b-bl5p5   1/1     Running   0          30m
     ```

  - Create and expose the service. Execute the below command from `deployment-templates` directory.
     ```
     kubectl apply -f todolist-service.yaml
     ```
  - Validate the service creation.
    ```
    kubectl get service
    ```
    Output will look something like below.
    ```
    NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
    todolist-service   LoadBalancer   172.21.150.79   <pending>     8080:30178/TCP   18s
    ```
 **Note:** If you are going to run the instructions from the terminal window then follow all these instructions on your terminal window.

### Access your to-do-list frontend application

Upon completion of the deployment of to-do-list frontend application on your IBM cloud kubernetes cluster, access the application on your browser using bewlo steps.

1. Get the `EXTERNAL-IP` of your node using below command
```
get nodes --output wide
```
Output will look something like below.
```
NAME            STATUS   ROLES    AGE    VERSION       INTERNAL-IP     EXTERNAL-IP      OS-IMAGE             KERNEL-VERSION       CONTAINER-RUNTIME
10.144.213.61   Ready    <none>   3d1h   v1.23.8+IKS   10.144.213.61   169.51.203.132   Ubuntu 18.04.6 LTS   4.15.0-189-generic   containerd://1.6.6
```
2. Access your application on a browser. Replace the `<EXTERNAL-IP>`
```
http://<EXTERNAL-IP>:30007
```
Example:
```
http://169.51.203.132:30007
```
<img width="1435" alt="Screen Shot 2022-07-25 at 10 27 54 AM" src="https://media.github.ibm.com/user/32795/files/8474c100-0c04-11ed-8fa4-3c143efebaf3">


## Pre-session Material

CloudNative concepts
https://cloudnative101.dev/concepts/cloud-native/

CloudNative development concepts
https://cloudnative101.dev/concepts/cloud-native-app-dev/

Containers concepts
https://cloudnative101.dev/concepts/containers/

What is kubernetes:
https://cloudnative101.dev/concepts/kubernetes/

Kubernetes concepts :
https://kubernetes.io/docs/concepts/
