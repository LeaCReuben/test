let scene, camera, renderer, model;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // strong white light
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new THREE.STLLoader();
    loader.load('/resources/amonguskeycap.stl', function (geometry) {
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Red color
        model = new THREE.Mesh(geometry, material);
        model.rotation.x = -0.5 * Math.PI; // Adjust model orientation
        scene.add(model);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    if (model) {
        model.rotation.y = (event.clientX / window.innerWidth) * 2 * Math.PI;
        model.rotation.x = (event.clientY / window.innerHeight) * 2 * Math.PI;
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export { init };
