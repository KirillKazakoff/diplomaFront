export default function registrateSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js', { scope: './' })
            .then((reg) => {
                console.log(`Reg ok. Scope is ${reg.scope}`);
            })
            .catch((error) => {
                console.log(`Reg failed with error ${error}`);
            });
    }
}
