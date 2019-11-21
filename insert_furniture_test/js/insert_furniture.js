var gl;

window.onload = function () {
	let scene = new THREE.Scene();
	let light;
	let camera;
	let loader; // OBJLoader 객체를 넣을 변수를 선언
	
	initThree();
	addDirectionalLight();
	
	// window click event
    window.addEventListener("click", function(event){
		// check log
		console.log('clcik event listener');
		console.log(event.clientX, event.clientY);
		// load OBJ file
		loadObjLoader('./furniture/bathroomCabinet.obj');
    } );

	loadObjLoader('./furniture/cat.obj');

	/**
	 * DirectionalLight를 추가하는 함수
	 *
	 * @method addDirectionalLight
	 */
	function addDirectionalLight() {

		light = new THREE.DirectionalLight(0xffffff, 1);
		light.castShadow = true;
		light.position.x = 5;
		light.position.y = 5;
		light.position.z = 5;
		scene.add(light);
	}

	/**
	 * .obj 파일의 모델을 로드하는 함수
	 *
	 * @method loadObjLoader
	 */
	function loadObjLoader(obj) {
		loader = new THREE.OBJLoader();
		loader.load(obj, function (object) {
			// finish to load model
			scene.add(object);
		}, function (xhr) {
			// loading model
			console.log(xhr.loaded / xhr.total * 100, '% loaded');
		}, function (error) {
			// fail to load model
			alert('모델을 로드 중 오류가 발생하였습니다.');
		});
	}

	/**
	 * Threejs 초기화 함수
	 *
	 * @method initThree
	 */
	 
	function initThree() {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		let renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		document.body.appendChild(renderer.domElement);

		let axes = new THREE.AxesHelper(0);
		scene.add(axes);

		camera.position.x = 2;
		camera.position.y = 1;
		camera.position.z = 1;

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.minDistance = 5;
		controls.maxDistance = 100;

		function animate() {
			requestAnimationFrame(animate);

			renderer.render(scene, camera);
			controls.update();
		}

		animate();
	}
}