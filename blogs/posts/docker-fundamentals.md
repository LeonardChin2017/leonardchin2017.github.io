---
title: "Docker: The Fundamentals"
date: Sept 25, 2023
summary: "In this blog, we'll dive into Docker, a tool that makes software work smoothly. We'll understand how Docker acts like a container, learn to build containers with Dockerfiles, and explore key instructions."
---

![Docker Banner](../resource/images/dokcer_banner.png)

At long last, I've found the time to delve into the core concepts of Docker in my blog. Docker has become a ubiquitous presence in the software industry. But what exactly is Docker? Docker is, at its core, a **container runtime**. (Other well-known container runtimes include Podman and CRI-O.) These container runtimes serve as an intermediary layer positioned between the host operating system and individual container instances.

But let's back up a bit. What is a container? A container is a technology that empowers us to isolate specific kernel processes, effectively convincing them that they are the sole inhabitants of an entirely new computer. Containers stand in stark contrast to virtual machines. While a virtual machine requires an entire guest operating system to be installed within the host operating system, a container shares the host OS kernel and merely carries its distinct set of binaries. In simpler terms, there's no need for a completely separate operating system within your host OS. This key difference eliminates one of the most significant drawbacks of virtual machines — the substantial computational overhead of virtualizing hardware for a guest OS.

Containers offer another impressive advantage: they can gracefully terminate and re-emerge when load balancing demands it. Whether a container ceases to exist due to a crash or because it's no longer needed during periods of low server traffic, containers are cost-effective to launch, and they are designed to appear and disappear seamlessly.

## Installation

For installation, simply refer to the official Docker page: [https://docs.docker.com/desktop/install/windows-install/](https://docs.docker.com/desktop/install/windows-install/)

After installation, you should be able to launch Docker Desktop.

![Docker Desktop](../resource/images/docker_window.jpg)

## Basic Instructions in Dockerfile

Docker can build images automatically by reading the instructions from a Dockerfile. A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.

| Instruction | Description |
|---|---|
| `FROM [IMAGE]` | A Dockerfile must start with a FROM instruction, specifying the underlying OS architecture for building the image. Choose a base image such as Ubuntu, CentOS, or Alpine (only 5MB). |
| `COPY [SRC] [DEST]` | Duplicates files or directories from SRC and integrates them into the container's file system at the path DEST. |
| `ADD [SRC] [DEST]` | Incorporates files or directories into a Docker image. Supports URL sources and auto-extracts compressed files. |
| `CMD` | Sets default parameters that can be overridden through the Docker CLI when the container is running. |
| `ENTRYPOINT` | Defines default parameters that cannot be altered when Docker containers are executed with CLI parameters. |
| `RUN [COMMANDS]` | Mainly used to construct images and install applications and packages. Creates a new layer atop an existing image. |
| `EXPOSE [PORT]` | Opens the specified port for inter-container communication. |
| `VOLUME` | Establishes a mount point and designates it as a location for externally mounted volumes from the host or other containers. |

## Additional Notes

- You can use `docker rmi -f IMAGEID` to remove a dangling image.
- When copying files into a Dockerfile, you have two options: `ADD` and `COPY`.
  - `ADD` is the older command — it supports local and URL sources, and automatically extracts compressed files.
  - `COPY` was introduced to address limitations of `ADD`, offering a more straightforward approach by only duplicating files or directories in their current format, exclusively supporting locally stored content.
  - Docker best practices recommend using `COPY` over `ADD` for transparency, especially when copying from the local build context.
  - Avoid using `ADD` for downloading packages from URLs — use `wget` or `curl` inside a `RUN` command instead to minimize image layers.
