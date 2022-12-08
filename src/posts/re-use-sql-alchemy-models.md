---
title: How to re-use SQLAlchemy models across multiple tables
layout: "surround/blog_base.liquid"
date: 2021-04-22
updated: null
tags: ["post"]
---

[Source Code](https://github.com/danstewart/blog-snippets/tree/main/reuse-alchemy-models)

When using SQLAlchemy declarative models you might find yourself wanting to re-use a model for multiple tables, this post will show you how to do it.

### A new base model

A lot of tables share common columns, like an `id`, `last_updated`, etc...
To handle this we can declare a new base model that all others inherit from:

```python
def snake_caser(text):
    """
    Converts camelCase/PascalCase to snake_case
    """
    return re.sub(r'(?<!^)(?=[A-Z])', '_', text).lower()


class CustomBase(db.Base):
    """
    This is our customised base table
    It includes a table name generator that converts the ClassName to class_name
    an ID primary key column and a basic repr() method

    Any models that inherit from this will automatically get these things
    """
    __abstract__ = True

    @declared_attr
    def __tablename__(cls):
        return snake_caser(cls.__name__)

    id = Column(Integer, primary_key=True)

    def __repr__(self):
        return f'<{self.__class__.__name__} {self.id}>'
```

The key part to this is `__abstract__ = True`, this tells SQLAlchemy that this isn't a real table (this is documented [here](https://docs.sqlalchemy.org/en/14/orm/inheritance.html?highlight=__abstract__#abstract-concrete-classes)).

This base also includes an `id` column, a basic `repr` method and a `__tablename__` declared attribute (more on this in a bit) that takes the class name and converts it to snake case.

### The re-usable models

Now we can create our abstract base for our real tables:

```python
class UserBase(CustomBase):
    __abstract__ = True

    label = ''

    # Columns
    name = Column(String(40))
    email = Column(String(120))

    # Relationship
    @declared_attr
    def posts(cls):
        return relationship(f'Post{cls.label}', backref=cls.__tablename__, lazy=True)


class PostBase(CustomBase):
    __abstract__ = True

    label = ''

    # Columns
    body = Column(Text(240))
    private = Column(Boolean)

    @declared_attr
    def user_id(cls):
        return Column(Integer, ForeignKey(f'user_{snake_caser(cls.label)}.id'))
```

These are both similar to the original `CustomBase` but have dynamic foreign keys and relationships based on the `label` property.

These are declared using the `@declared_attr` decorator which let's us use methods as attributes, which let's us dynamically create the mappings (documented [here](https://docs.sqlalchemy.org/en/14/orm/mapping_api.html#sqlalchemy.orm.declared_attr)).

Now we can declare our real models, inheriting from `UserBase` and `PostBase` and all they need is a `label` property:

```python
# ProductA Models
class UserProductA(UserBase):
    """
    This extends the UserBase model so is a copy of that but with the table name user_product_a

    We can overwrite or extend however we want but the only the we NEED is to define the label
    The label should be cased the same as the class name
    """
    label = 'ProductA'


class PostProductA(PostBase):
    label = 'ProductA'
```

It's as easy as that, if you add a label property to the child models everything will just work ™️.

`UserProductA` will have a relationship with `PostProductA` and `PostProductA` will have a foreign key to `user_product_a`.
