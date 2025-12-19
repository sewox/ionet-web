module.exports = {
    apps: [{
        name: "ionet-web",
        script: "./server/index.cjs",
        env: {
            NODE_ENV: "production",
            PORT: 3001
        },
        cwd: "./",
        // Watch disable in production typically
        watch: false,
        instances: 1,
        exec_mode: "fork"
    }]
};
