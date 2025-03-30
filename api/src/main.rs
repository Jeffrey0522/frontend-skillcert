// This file is the entry point of the application.
// It initializes the application, sets up the database connection, and starts the server.

use actix_web::{web, App, HttpServer};
use sqlx::PgPool;

mod models;
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url).await.expect("Failed to connect to the database");

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .route("/users", web::get().to(models::user::get_users))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}