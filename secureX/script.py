# script.py

from detect_vpn.models import LearningInfo

# Create and save lessons
lessons = [
    {'lesson_number': 1, 'lesson_title': 'Introduction to Computer Networks', 'lesson_description': 'Computer networks are essential for modern communication, allowing devices to connect and share data. This lesson provides an overview of computer networks, including their basic concepts, components, and types. Topics covered include network protocols, architectures, and the OSI model.'},
    {'lesson_number': 2, 'lesson_title': 'Network Topologies', 'lesson_description': 'Network topologies define the physical or logical layout of devices and connections in a network. This lesson explores different types of network topologies, such as bus, star, ring, and mesh. Each topology has its advantages and disadvantages, impacting factors like scalability, fault tolerance, and performance.'},
    {'lesson_number': 3, 'lesson_title': 'TCP/IP Protocol Suite', 'lesson_description': 'The TCP/IP protocol suite is the foundation of the Internet and most modern networks. This lesson covers the key protocols in the TCP/IP stack, including TCP, UDP, IP, and ICMP. Topics include packet switching, addressing, routing, and reliable data transmission.'},
    {'lesson_number': 4, 'lesson_title': 'Network Security Fundamentals', 'lesson_description': 'Network security is crucial for protecting sensitive data and preventing unauthorized access to network resources. This lesson introduces fundamental concepts in network security, such as encryption, authentication, access control, and firewalls. It also explores common security threats and countermeasures.'},
    {'lesson_number': 5, 'lesson_title': 'Wireless Networks', 'lesson_description': 'Wireless networks enable flexible connectivity without the need for physical cables. This lesson examines wireless networking technologies, including Wi-Fi (802.11), Bluetooth, and cellular networks. Topics include wireless communication principles, standards, security considerations, and emerging trends.'},
]

for lesson_data in lessons:
    LearningInfo.objects.create(**lesson_data)
