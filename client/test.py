#!/usr/bin/python3

import os


def cli_call(command):
    return os.popen("./client.py "+command).read()


def create_actor(actor):
    return cli_call("create-actor "+actor).split("0x")[1].split(" ")[0]

def create_transaction(actor1, actor2, product, transaction=None):
    cmd = f"create-transaction {actor1} {actor2} {product}"
    if transaction:
        cmd += f" --previous-transaction {transaction}"
    return cli_call(cmd).split("0x")[1].split(" ")[0]

def accept_transaction(actor, transaction):
    return cli_call(f"accept-transaction {actor} {transaction}")

def finish_transaction(actor, transaction):
    return cli_call(f"finish-transaction {actor} {transaction}")

def traceability(transaction):
    return cli_call(f"traceability {transaction}")

actor1 = create_actor("Actor1")
actor2 = create_actor("Actor2")
transaction = create_transaction(actor1, actor2, "cafe")
a = accept_transaction(actor2)
print(a)
a = finish_transaction(actor2)
print(a)
a = traceability()
print(a)
