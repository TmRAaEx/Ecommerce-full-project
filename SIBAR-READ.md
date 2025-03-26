# Förändringar

## ✅ Lagt till lösenordsskyddade admins i databasen  
## ✅ Lagt till routes för hantering av admins  
## ✅ Ändrat så att `insert_id` skickas med vid skapande av relevanta entiteter  

📄 **För översikt av databasförändringar, se `ecommerce-api/ER-diagram.pdf`**  

---

# 🌍 ENV-variabler  

## 🔧 Backend  
```shell
DB_NAME=""
DB_PASSWORD=""
DB_USER=""
ADMIN_KEY=""
STRIPE_API_KEY=""
STRIPE_ENDPOINT_SECRET=""
```


## 🎨 Frontend
```shell
VITE_API_BASE="http://localhost:3000"
VITE_STRIPE_PK=""
```