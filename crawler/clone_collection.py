

# client = MongoClient(
#     "mongodb+srv://admin:admin123@cluster0.l7duj.mongodb.net/tipi-shopping")

# database = client['products']

# product_collections = database['Tiki']

# client = MongoClient('mongodb+srv://admin:admin123@cluster0.lfcdu.mongodb.net/test')
# client.admin.command('copydb', fromdb='products', todb='products', fromhost='mongodb+srv://admin:admin123@cluster0.l7duj.mongodb.net/tipi-shopping')


from pymongo import MongoClient
from tqdm import tqdm
db1 = MongoClient('mongodb+srv://admin:admin123@cluster0.l7duj.mongodb.net/tipi-shopping')['products']['Tiki']
db2 = MongoClient('mongodb+srv://admin:admin123@cluster0.lfcdu.mongodb.net/test')['products']['Tiki']
for a in tqdm(db1.find()):
    try:
        del a['_id']
        db2.insert_one(a)
    except:
        print('did not copy')