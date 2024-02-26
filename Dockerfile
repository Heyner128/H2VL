FROM ubuntu:latest
LABEL authors="heyner"

ENTRYPOINT ["top", "-b"]