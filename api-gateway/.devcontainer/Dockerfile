# Use an official Ubuntu as a parent image
FROM ubuntu:latest
WORKDIR /app

# Install required packages
RUN apt-get update && apt-get install -y \
    openssh-server \
    git \
    openjdk-17-jdk \
    maven \
    sudo \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    rm -rf /var/lib/apt/lists/*


# Create the SSH directory and set permissions
RUN mkdir -p /var/run/sshd

# Create a user and set the password (replace 'user' and 'password')
RUN useradd -m -s /bin/bash user && echo "user:password" | chpasswd && echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create the SSH directory for the user
RUN mkdir -p /home/user/.ssh && chown -R user:user /home/user/.ssh && chmod 700 /home/user/.ssh

# Copy the SSH public key to the user's authorized_keys
COPY id_rsa.pub /home/user/.ssh/authorized_keys

# Set the appropriate permissions for the authorized_keys file
RUN chown user:user /home/user/.ssh/authorized_keys && chmod 600 /home/user/.ssh/authorized_keys

# Expose the SSH port and additional ports for web services
EXPOSE 8080

# Start the SSH service
CMD ["/usr/sbin/sshd", "-D"]
