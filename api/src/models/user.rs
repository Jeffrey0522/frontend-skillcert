use serde::{Deserialize, Serialize};
use chrono::NaiveDateTime;
use actix_web::{web, HttpResponse, Responder};
use sqlx::PgPool;

#[derive(Debug, Serialize, Deserialize)]
pub enum UserRole {
    Student,
    Institution,
    Admin,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: u64,
    pub name: String,
    pub email: String,
    pub password_hash: String,
    pub role: UserRole,
    pub wallet_address: String,
    pub is_verified: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

impl User {
    pub fn new(
        id: u64,
        name: String,
        email: String,
        password_hash: String,
        role: UserRole,
        wallet_address: String,
        is_verified: bool,
        created_at: NaiveDateTime,
        updated_at: NaiveDateTime,
    ) -> Self {
        Self {
            id,
            name,
            email,
            password_hash,
            role,
            wallet_address,
            is_verified,
            created_at,
            updated_at,
        }
    }
}


/// Handler to retrieve all users from the database.
/// This corresponds to the GET /users route.
pub async fn get_users(pool: web::Data<PgPool>) -> impl Responder {
    let result = r#"
        SELECT
            id,
            name,
            email,
            password_hash,
            role,
            wallet_address,
            is_verified,
            created_at,
            updated_at,
        FROM users
    "#;
    HttpResponse::Ok()
        .content_type("text/plain")
        .body(result)
}