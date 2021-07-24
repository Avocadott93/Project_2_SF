import pandas as pd
import numpy as np
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template

from flask import Flask, jsonify

# Connect sql engine to the server
from sqlalchemy import create_engine
engine = create_engine('postgresql://postgres:postgres@localhost:5432/businessreg')

# Read our table in from Postgresql
df = pd.read_sql('''SELECT * FROM sf_business_1''', con=engine)
#df.head()


# #result = df.to_json(orient="split")
# parsed = json.loads(result)
# json.dumps(parsed, indent=4)  

# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route('/')
def index():
    return render_template("index.html", pageone="active")
@app.route('/test')
def test():
    return render_template("test.html", text="Welcome to my home!")
@app.route('/page_two')
def pagetwo():
    return render_template("page_two.html", pagetwo="active")
@app.route('/page_three')
def pagethree():
    return render_template("page_three.html", pagethree="active")    

#  @app.route('/two', methods = ['GET'])
#  def page_two():
    #listings = mongo.db.listings.find_one()
    #return render_template('page_two.html')

# This json data is used for mapping
@app.route('/api/sql_data',methods=['GET'])
def sql_data():
    # limit 300 results shown in front end
  df = pd.read_sql('''SELECT * FROM sf_business_1 limit 300''', con=engine)
  df.fillna("none", inplace=True)
  sql_sfdata = df.to_dict('records')
  return jsonify(sql_sfdata)

# This json data is used for the homepage filter table
@app.route('/api/sql_data_0',methods=['GET'])
def sql_data_0():
    # limit 300 results shown in front end
  df = pd.read_sql('''SELECT * FROM sf_business_0 limit 300''', con=engine)
  df.fillna("none", inplace=True)
  sql_sfdata_0 = df.to_dict('records')
  return jsonify(sql_sfdata_0)

if __name__ == "__main__":
    app.run(debug=True)