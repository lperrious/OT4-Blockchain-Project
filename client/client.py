#!/usr/bin/python3

import click
import requests

API_ADDRESS = 'http://127.0.0.1:8080/api/v1/'
#API_ADDRESS = 'http://127.0.0.1:4444/api/v1/'

class call_error(Exception):
    def __init__(self, detail):
        self.detail = detail

def api_call(method="GET", endpoint="", args={}):
    method = method.upper() if method.upper() in ["GET", "POST", "PUT"] else "GET"
    r = requests.request(method, API_ADDRESS+endpoint, json=args)
    answer = r.json()
    if answer["success"] != True:
        raise call_error(answer)
    answer = answer["data"]
    r.close()
    return answer


class AddressType(click.ParamType):
    name = "address"

    def convert(self, value, param, ctx):
        try:
            if value[:2] == "0x" and len(value)==42:
                return value
            raise
        except:
            self.fail(f"{value!r} is not a valid adress", param, ctx)

class AddressTransactionType(click.ParamType):
    name = "address"

    def convert(self, value, param, ctx):
        try:
            if value[:2] == "0x" and len(value)==66:
                return value
            raise
        except:
            self.fail(f"{value!r} is not a valid adress", param, ctx)

ADDRESS = AddressType()
ADDRESS_TRANSACTION = AddressTransactionType()


@click.group()
def cli():
    pass


@cli.command()
@click.argument('name', type=str)
def create_actor(name):
    """Create a new actor in the blockchain.

    NAME is the name of the new actor on the blockchain.
    """
    click.echo('Creating the actor...')
    try:
        r = api_call("POST", "actors", {"name" : name})
        click.echo('Actor createad.')
        click.echo(f'The address of the actor is : {r["actorAddress"]}')
    except Exception as e:
        click.echo('An error occured during the creation of the actor.')
        click.echo(e)



@cli.command(help='Create a new transaction to modify a product or to send it to another actor.')
@click.argument('actor_address', type=ADDRESS)
@click.argument('receiver_address', type=ADDRESS)
@click.argument('product_name', type=str)
@click.option('-t', '--previous-transaction', type=ADDRESS_TRANSACTION, help='Address of the transact that the product is comming from.')
def create_transaction(actor_address, receiver_address, product_name, previous_transaction):
    """Create a new transaction to modify a product or to send it to another actor

    ACTOR_ADDRESS is the address of the actor who wants to create the transaction.
    RECEIVER_ADDRESS is the address of the actor who to receive the transaction.
    PRODUCT_NAME is the name of the product at the end of the transaction.
    """
    click.echo('Creating the transaction...')
    try:
        params = {"actorAddress" : actor_address, "receiverAddress": receiver_address, "productName": product_name}
        if previous_transaction:
            params["addressPreviousTransaction"] = previous_transaction
        r = api_call("POST", "transactions", params)
        click.echo('Transaction createad.')
        click.echo(r)
        click.echo(f'The address of the transaction is : {r["transaction"]}')
    except Exception as e:
        click.echo('An error occured during the creation of the transaction.')
        click.echo(e)


@cli.command()
@click.argument('actor_address', type=ADDRESS)
@click.argument('transaction', type=ADDRESS)
def accept_transaction(actor_address, transaction):
    """Accept a transaction.
    
    ACTOR_ADDRESS is the address of the actor who wants to accept the transaction.
    TRANSACTION is the address of the transaction to accept.
    """
    click.echo('Accepting the transaction...')
    try:
        r = api_call("PUT", "transactions/"+transaction+"/accept", {"receiverAddress" : actor_address, "transactionAddress": transaction})
        click.echo('Transaction accepted.')
    except Exception as e:
        click.echo('An error occured during the acceptation of the transaction.')
        click.echo(e)


@cli.command()
@click.argument('actor_address', type=ADDRESS)
@click.argument('transaction', type=ADDRESS_TRANSACTION)
def finish_transaction(actor, transaction):
    """Finish an accepted transaction.
    
    ACTOR_ADDRESS is the address of the actor who wants to finish the transaction.
    TRANSACTION is the address of the transaction to finish.
    """
    click.echo('Finishing the transaction...')
    try:
        r = api_call("PUT", "transactions/"+transaction+"/accept", {"receiverAddress" : actor, "transactionAddress": transaction})
        click.echo('Transaction accepted.')
    except Exception as e:
        click.echo('An error occured during the finalisation of the transaction.')
        click.echo(e)


@cli.command()
@click.argument('transaction', type=ADDRESS)
def traceability(transaction):
    """See all the historic starting from a transaction.
    
    TRANSACTION is the address of the transaction which all the historic will be display.
    """
    click.echo('Loading the historic...')
    try:
        r = api_call("GET", "transactions/"+transaction+"/traceability")
        click.echo('Historic found.')
    except Exception as e:
        click.echo('An error occured during the acceptation of the transaction.')
        click.echo(e)


if __name__ == '__main__':
    cli()
