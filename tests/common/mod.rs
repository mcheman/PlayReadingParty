use play_reading_party::get_server;
use sqlx::{Pool, Postgres};
use std::net::TcpListener;
use std::path::PathBuf;

// Create a test application on a random port using the given database pool
pub async fn setup_test_environment(pool: &Pool<Postgres>, end_url: &str) -> TestApp {
    let ip = "127.0.0.1";
    let listener = TcpListener::bind(format!("{}:0", ip))
        .expect("A random port should be able to be found to bind to");
    let port = listener.local_addr().unwrap().port();
    let address = format!("http://{}:{}", ip, port);

    let server = get_server(listener, pool.clone(), PathBuf::from("/tmp")).unwrap();
    let _ = tokio::spawn(server);
    let app = TestApp {
        client: reqwest::Client::new(),
        url: format!("{}/api/{}", address, end_url),
    };
    app
}

pub struct TestApp {
    pub client: reqwest::Client,
    pub url: String,
}
