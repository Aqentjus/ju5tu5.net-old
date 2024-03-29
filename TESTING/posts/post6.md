# Host minecraft server on linux
Date: 2024-03-29
Description: Here I show how I hosted my own minecraft server using proxmox on debian linux
Content:

//
1.	First get youreself a linux machine. (I created my linux machine in to my proxmox server)

//
![image](images/minecraft/1.png)
//
2.	First lets give our normal user sudo permission by signing as the root:
    a.	su – 
    b.	root password
    c.	usermod -aG [account name (this case Minecraft)]
![image](images/minecraft/2.png)
//
    d.	visudo
    e.	and add a new line for the user
//
![image](images/minecraft/3.png)
//
    f.	exit
    g.	sudo whoami (if this says root youre good to go)
//
3.	Update the machine:
    a.	Sudo apt update
    b.	Sudo apt upgrade
4.	Install java [replace the 17 with the newest version number]
    a.	Sudo apt install openjdk-17-jre
5.	Next create a new directory called Minecraft and in this case give it all privileges
//
![image](images/minecraft/4.png)
//
6.	Next download the server.jar file from the Minecraft official website:
    a.	https:/www.minecraft.net/en-us/download/server
//
![image](images/minecraft/5.png)
//
7.	Now you can start the server [by changing the Xmx and Xms values you can modify how much ram the server can use for minecraft]:
    a.	java -Xmx1024M -Xms1024M -jar server.jar nogui
    b.	after this it will give you an error
    c.	sudo nano eula.txt
    d.	and change the false value to true
//
![image](images/minecraft/6.png)
//
    e.	now run youre Minecraft server again and then you can join the game
    f.	you can get the server ip by running: ip addr in the terminal
BONUS
    if you already have a world that you would like to play in you can replace the world directory with youre old singleplayer or multiplayer world just keep in mind to keep the directory name the same
//
![image](images/minecraft/7.png)
