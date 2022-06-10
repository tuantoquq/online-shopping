import requests
import json
from pymongo import MongoClient
import argparse
import re
from tqdm import tqdm

parser = argparse.ArgumentParser()
parser.add_argument('--start', type=int, default=0)
parser.add_argument('--end', type=int, default=4)
parser.add_argument('--start_page', type=int, default=0)
parser.add_argument('--end_page', type=int, default=100)
args = parser.parse_args()

client = MongoClient(
    "mongodb+srv://admin:admin123@cluster0.l7duj.mongodb.net/tipi-shopping")

database = client['products']

product_collections = database['Tiki']

categories = {
    'bach-hoa-online': 4384,
    'nha-cua-doi-song': 1883,
    'dien-tu-dien-lanh': 4221,
    'thiet-bi-kts-phu-kien-so': 1815,
    'dien-thoai-may-tinh-bang': 1789,
    'do-choi-me-be': 2549,
    'lam-dep-suc-khoe': 1520,
    'dien-gia-dung': 1882,
    'thoi-trang-nu': 931,
    'thoi-trang-nam': 915,
    'giay-dep-nu': 1703,
    'tui-vi-nu': 976,
    'giay-dep-nam': 1686,
    'tui-thoi-trang-nam': 27616,
    'balo-va-vali': 6000,
    'phu-kien-thoi-trang': 27498,
    'dong-ho-va-trang-suc': 8371,
    'hang-quoc-te': 17166,
    'laptop-may-vi-tinh-linh-kien': 1846,
    'o-to-xe-may-xe-dap': 8594,
    'nha-sach-tiki': 8322,
    'the-thao-da-ngoai': 1975,
    'may-anh': 1801,
}

api_get_id_product = 'https://tiki.vn/api/personalish/v1/blocks/listings?limit=48&include=advertisement&aggregations=2&trackity_id=3b437fb6-697c-366d-6f2b-9251936c2036&category={}&page={}&urlKey={}'

api_product = 'https://tiki.vn/api/v2/products/{}'
product_field = [
    'short_url', 'name', 'short_description', 'price', 'list_price', 'rating_average',
    'rating_average', 'review_count', 'inventory_status', 'inventory_type',
    'productset_group_name', 'all_time_quantity_sold', 'description', 'images', 'brand', 'current_seller',
    'specifications', 'configurable_options', 'quantity_sold','categories'
]


def get_list_id_product(url):
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36"
    })
    list_ids = []
    if response.status_code == 200:
        data = json.loads(response.text)['data']
        for sample in data:
            list_ids.append(sample['id'])

    return list_ids


def get_information_product(url):
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/100.0.4896.127 Safari/537.36 "
    })
    if response.status_code == 200:
        data = json.loads(response.text)
        item = {}
        for field in product_field:
            try:
                item[field] = data[field]
            except:
                pass
        product_collections.insert_one(item)


if __name__ == '__main__':
    list_key = list(categories.keys())
    for i in range(args.start, args.end, 1):
        category_name = list_key[i]
        category_id = categories[category_name]
        for page_index in tqdm(range(args.start_page, args.end_page)):
            category_page_url = api_get_id_product.format(category_id,page_index, category_name)
            # category_name = re.search('vn\/(.*?)\/', category_page_url).group(1)
            list_product_ids = get_list_id_product(category_page_url)
            if len(list_product_ids) > 0:
                for product_id in list_product_ids:
                    product_url = api_product.format(product_id)
                    get_information_product(product_url)


