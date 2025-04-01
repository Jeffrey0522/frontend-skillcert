// This file is the entry point of the application.
// It initializes the application, sets up the database connection, and starts the server.

use actix_web::{web, App, HttpServer};
use tokio::net::TcpListener;

mod models;

mod config;
mod db;
use crate::config::Configuration;
use crate::db::Db;

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    // Read (development) Environment Variables.
    dotenvy::dotenv().ok();

    // App configuration.
    tracing::debug!("Initializing configuration");
    let config = Configuration::new();

    println!("Configuration: {:?}", config);
    // Initialize DB connection.
    tracing::debug!("Initializing DB pool");
    let db = Db::new(&config.db_str, config.db_pool_max_size)
    .await
    .unwrap_or_else(|err| panic!("Failed to initialize DB: {:?}", err));

    // Run migrations.
    tracing::debug!("Running Migrations");
    db.migrate().await.expect("Failed to run migrations");

    // Listen for requests on specified port.
    tracing::info!("Starting server on {}", config.listen_address);
    let listener = TcpListener::bind(&config.listen_address)
        .await
        .expect("Failed to bind address");

    // // Start the server with the /users route.
    // tracing::info!("Starting server on {}", config.listen_address);
    // HttpServer::new(move || {
    //     App::new()
    //         // In case your get_users expects a PgPool, ensure that you pass it.
    //         // For example, if your Db type exposes the pool as `db.pool` and implements Clone:
    //         .app_data(web::Data::new(db.clone()))
    //         .route("/users", web::get().to(models::user::get_users))
    // })
    // .bind(config.listen_address)?
    // .run()
    // .await


    HttpServer::new(|| {
        App::new()
            .service(web::resource("/").to(|| async { "hello world" }))
    })
    .bind(("127.0.0.1", 8081))?
    .run()
    .await

}