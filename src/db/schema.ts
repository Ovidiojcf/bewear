import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable =  pgTable("user",{
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
});

export const colorEnum = pgEnum("color", [
  "Preto",
  "Preta",
  "Branco",
  "Branca",
  "Azul",
  "Verde",
  "Bege",
  "Vinho",
  "Marrom",
  "Cinza",
  "Amarela"
])

//Slug auxilia no padrão de nomes de produtos
// Tênis Nike Air Max -> tenis-nike-air-max
// o acesso a url fica mais amigável e ajuda no SEO
// Exemplo: site.com/product/tenis-nike-air-max

export const productTable = pgTable("product",{
    id: uuid().primaryKey().defaultRandom(),
    categoryId: uuid("category_id").notNull().references(() => categoryTable.id),
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text().notNull(),
    createdAt: timestamp("created_at" ).notNull().defaultNow(),
});

export const categoryTable = pgTable("category",{
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    slug: text().notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categoryRelations = relations( categoryTable, (params) => {
    return {
        products: params.many(productTable),
    };
});

// Product Variant representa uma variação de um produto, como tamanho ou cor 
// Nesse caso a vaiação que possui o preço, como a nike para certas cores, valores mais altos
// Exemplo: Tênis Nike Air Max - Preto - 42 - R$ 499,99
// Exemplo: Tênis Nike Air Max - Branco - 40 - R$ 459,99
export const productVariantTable = pgTable("product_variant", {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => productTable.id),
    name: text().notNull(),
    color: colorEnum("color").notNull(),
    slug: text().notNull().unique(),
    priceInCents: integer("price_in_cents").notNull(),
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRelations = relations(productTable, ({one, many}) => {
    return {
        category: one(categoryTable, {
            fields: [productTable.categoryId],
            references: [categoryTable.id],
        }),
        variants: many(productVariantTable),
    };
});


export const productVariantRelations = relations(productVariantTable, (params) => {
    return {
        product: params.one(productTable, {
            fields: [productVariantTable.productId],
            references: [productTable.id],
        }),
    };
});



