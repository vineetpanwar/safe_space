import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, jsonify
from tinydb import TinyDB, Query
from classes.Resource import Resource

# app = Flask(__name__)

resource_instance = Resource()
