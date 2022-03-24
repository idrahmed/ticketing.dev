This project was completed as part of the Microservices with Node JS and React course. It allows users to re-sell tickets they possess to other users. Buyers can reserve tickets and have 15 minutes to purchase them before the ticket is unreserved and placed back for sale. Payment is made by stripe in test mode.
The application leveraged docker, kubernetes and google cloud during development and deployment. It uses mongodb to store tickets, orders and payments. 

![image](https://user-images.githubusercontent.com/68883139/159907844-a0923839-7215-4ed5-8877-82da20444d7b.png)

Users also have a personal dashboard where they can see their currently reserved tickets as well as previous purchased tickets. 

![image](https://user-images.githubusercontent.com/68883139/159908098-64ae5a34-a2b2-4c17-a552-e4a6ba103d2d.png)

Users create tickets via a form. Both front-end and back-end api-level verification is set up to ensure all fields are filled out appropriately. 

![image](https://user-images.githubusercontent.com/68883139/159908461-4ccfa3f2-b897-48b6-af23-76bbbc0828a9.png)






