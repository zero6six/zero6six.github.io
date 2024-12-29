
### 存

```python
# 将 saveList 这个对象存到文件
with open(file, "w", encoding='utf-8') as f:
    json.dump(saveList, f, ensure_ascii=False, indent=4)
```

### 读

```python
with open(file_path, "r", encoding="utf-8") as file:
    loadList = json.load(file)
```