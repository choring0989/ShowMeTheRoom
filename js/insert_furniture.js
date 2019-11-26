var gl;
var furniture_path;

window.onload = function () {
	// variables
	furniture_path = ''
	let scene = new THREE.Scene();
	let light, gird, gridH, camera;
	let mouse;
	let loader; // OBJLoader 객체를 넣을 변수를 선언
	let cl, roomsize;
	let furniture_size = 3.35;//
	let objarr = new Array();
	let mtlLoader; // MTLLoader 객체를 넣을 변수
	room_floor = './furniture/floorFull.obj'

	/** mouse click event function for inserting furniture */
	let onMouseClick = function(e){
		if (cl==1) {// grid 변의 길이
			var wh = 360/4;
			console.log('wh=');
			console.log(wh);
			if(e.clientY <326){
				if(e.clientX < 796){
				mouse.x = (e.clientX - 680) / wh-1.2;
				mouse.y = (e.clientY - 300) / wh-0.9;
				}
				else{				
				mouse.x = (e.clientX - 680) / wh-0.3;
				mouse.y = (e.clientY - 300) / wh-0.9;
				}
			
			}
			else{
			if(e.clientX < 796){
				mouse.x = (e.clientX - 680) / wh-1.2;
				mouse.y = (e.clientY - 300) / wh-0.1;
				}
				else{
				mouse.x = (e.clientX - 680) / wh-0.3;
				mouse.y = (e.clientY - 300) / wh-0.1;
				}
			}
			if(mouse.x >= (roomsize/2) || mouse.y >= (roomsize/2) || mouse.x <= -(roomsize/2) || mouse.y <= -(roomsize/2)) {
				console.log("not in area");
			}
			else {
				loadMTLLoader(mouse, furniture_path, furniture_size, 1);
				console.log("in area")
			}
		}
	}

	/** control roomsize */
	roomsize = document.getElementById("roomsize").innerText;

	var btn_plus = document.getElementById("plus");
	var btn_minus = document.getElementById("minus");
	var inner = document.getElementById("roomsize").innerText;

	btn_plus.addEventListener("click", function(event) {
		if (Number(inner) < 20) {
			furniture_size = furniture_size*0.8;
			document.getElementById("roomsize").innerText = Number(inner)+2;
			roomsize = document.getElementById("roomsize").innerText;
			scene.remove(grid);
			var temp = objarr.length;
			for(var i=0; i<temp; i++){
				var value = objarr.pop();
				scene.remove(value);
			}
			addGridView();
			inner = document.getElementById("roomsize").innerText;
		}
	});

	btn_minus.addEventListener("click", function(event) {
		if (Number(inner) > 6) {
			furniture_size = furniture_size*1.2;
			document.getElementById("roomsize").innerText = Number(inner)-2;
			roomsize = document.getElementById("roomsize").innerText;
			scene.remove(grid);
			var temp = objarr.length;
			for(var i=0; i<temp; i++){
				var value = objarr.pop();
				scene.remove(value);
			}
			addGridView();
			inner = document.getElementById("roomsize").innerText;
		}
	});

	/** [Start] furniture button listener */
	var benchCushion = document.getElementById("benchCushion");
	benchCushion.addEventListener("click", function(event){
		furniture_path = './furniture/benchCushion.obj';
		console.log("furniture path ="+'./furniture/benchCushion.obj')
	});

	var bedBunk = document.getElementById("bedBunk");
	bedBunk.addEventListener("click", function(event){
		furniture_path = './furniture/bedBunk.obj';
		console.log("furniture path ="+'./furniture/bedBunk.obj')
	});

	var bookcaseClosedWide = document.getElementById("bookcaseClosedWide");
	bookcaseClosedWide.addEventListener("click", function(event){
		furniture_path = './furniture/bookcaseClosedWide.obj';
		console.log("furniture path ="+'./furniture/bookcaseClosedWide.obj')
	});

	var cardboardBoxOpen = document.getElementById("cardboardBoxOpen");
	cardboardBoxOpen.addEventListener("click", function(event){
		furniture_path = './furniture/cardboardBoxOpen.obj';
		console.log("furniture path ="+'./furniture/cardboardBoxOpen.obj')
	});

	var cabinetTelevision = document.getElementById("cabinetTelevision");
	cabinetTelevision.addEventListener("click", function(event){
		furniture_path = './furniture/cabinetTelevision.obj';
		console.log("furniture path ="+'./furniture/cabinetTelevision.obj')
	});

	var chairModernCushion = document.getElementById("chairModernCushion");
	chairModernCushion.addEventListener("click", function(event){
		furniture_path = './furniture/chairModernCushion.obj';
		console.log("furniture path ="+'./furniture/chairModernCushion.obj')
	});

	var dryer = document.getElementById("dryer");
	dryer.addEventListener("click", function(event){
		furniture_path = './furniture/dryer.obj';
		console.log("furniture path ="+'./furniture/dryer.obj')
	});

	var kitchenBar = document.getElementById("kitchenBar");
	kitchenBar.addEventListener("click", function(event){
		furniture_path = './furniture/kitchenBar.obj';
		console.log("furniture path ="+'./furniture/kitchenBar.obj')
	});

	var kitchenFridge = document.getElementById("kitchenFridge");
	kitchenFridge.addEventListener("click", function(event){
		furniture_path = './furniture/kitchenFridge.obj';
		console.log("furniture path ="+'./furniture/kitchenFridge.obj')
	});

	var kitchenSink = document.getElementById("kitchenSink");
	kitchenSink.addEventListener("click", function(event){
		furniture_path = './furniture/kitchenSink.obj';
		console.log("furniture path ="+'./furniture/kitchenSink.obj')
	});

	var lampRoundFloor = document.getElementById("lampRoundFloor");
	lampRoundFloor.addEventListener("click", function(event){
		furniture_path = './furniture/lampRoundFloor.obj';
		console.log("furniture path ="+'./furniture/lampRoundFloor.obj')
	});

	var loungeChair = document.getElementById("loungeChair");
	loungeChair.addEventListener("click", function(event){
		furniture_path = './furniture/loungeChair.obj';
		console.log("furniture path ="+'./furniture/loungeChair.obj')
	});

	var loungeSofa = document.getElementById("loungeSofa");
	loungeSofa.addEventListener("click", function(event){
		furniture_path = './furniture/loungeSofa.obj';
		console.log("furniture path ="+'./furniture/loungeSofa.obj')
	});

	var televisionModern = document.getElementById("televisionModern");
	televisionModern.addEventListener("click", function(event){
		furniture_path = './furniture/televisionModern.obj';
		console.log("furniture path ="+'./furniture/televisionModern.obj')
	});

	var washer = document.getElementById("washer");
	washer.addEventListener("click", function(event){
		furniture_path = './furniture/washer.obj';
		console.log("furniture path ="+'./furniture/washer.obj')
	});
	/** [End] furniture button listener */

	initThree();
	addDirectionalLight();
	addGridView();

	// button event
	/** *************Insert Furniture Mode********************** */
	var InsertButton = document.getElementById("insert");
    InsertButton.addEventListener("click", function(event) {
		camera.position.x = 0;
		camera.position.y = 6;
		camera.position.z = 0;
		cl=1;
		document.getElementById("mode").innerText = '현재 모드: 가구 삽입'
	});

	/** *************Change View Space Mode********************** */	
	var ViewButton = document.getElementById("view");
	ViewButton.addEventListener("click", function(event) {
		cl=0;
		document.getElementById("mode").innerText = '현재 모드: view'
	});

	/** DirectionalLight를 추가하는 함수 */
	function addDirectionalLight() {
		light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.castShadow = false;
		light.position.x = -10;
		light.position.y = 15;
		light.position.z = -20;
		scene.add(light);
	}

	/** GridHelper를 추가하는 함수 */
	function addGridView() {
		// add grid
		// size 고정
		var size = 8;

		grid = new THREE.Object3D();
		gridH = new THREE.GridHelper(size, roomsize, 0x0000ff, 0x808080);
		gridH.position.y = 0;
		gridH.position.x = 0;
		gridH.position.z = 0;
		grid.add(gridH);
		scene.add(grid);

		// 장판깔기
		mouse.x = 4;
		mouse.y = -4;
		mouse.z = -0.41;
		loadMTLLoader(mouse, room_floor, 8, 0);
	}

   /** .obj 파일의 모델을 로드하는 함수
   function loadObjLoader(position, obj, materials, size) {
      loader = new THREE.OBJLoader();
      loader.load(obj, function (object) {
         // set position of object
         object.position.set(position.x, 0, position.y);
		 object.scale.x = object.scale.y = object.scale.z = size;
         // object.position.set(1, 0, 1);
         // add object
		 // loader.setMaterials(materials);
		 // objarr.push(object);
         // scene.add(object);
      }, function (xhr) {
         // loading model
         console.log(xhr.loaded / xhr.total * 100, '% loaded');
      }, function (error) {
         // fail to load model
         alert('모델을 로드 중 오류가 발생하였습니다.');
      });
      }
      */

	/** 텍스쳐 입히는 함수 */
	function loadMTLLoader(position, obj, size, flag) {
		mtlLoader = new THREE.MTLLoader();
		var name = "."+obj.split(".")[1]+".mtl";
		console.log("mtl name="+name);
		// 로드할 Material 파일 명을 입력합니다.

		// [Start] 수정된 부분
		mtlLoader.load(name, function (materials) {
			// 로드 완료되었을때 호출하는 함수
			materials.preload();
			//loadObjLoader(position, obj, materials, size);

			var obj_loader = new THREE.OBJLoader();
			obj_loader.setMaterials(materials)
			obj_loader.load(obj, function(object) {
				let mesh = object.children[0]
				if (position.z == null) position.z = 0;
				mesh.position.set(position.x, position.z, position.y);
				mesh.scale.x = mesh.scale.y = mesh.scale.z = size;
				scene.add(mesh);
				if(flag == 1){ objarr.push(mesh); }
			},)
		}// [End] 수정된 부분
		, function (error) {
			// 로드가 실패했을때 호출하는 함수
			console.error('MTLLoader 로드 중 오류가 발생하였습니다.', error);
			// alert('MTLLoader 로드 중 오류가 발생하였습니다.');//빡쳐서 주석함
		});
	}

	// furnitre 이름 목록 불러오
	function getFilename(){
		var testFolder = './furniture';
		var fs = require('fs');

		fs.readdir(testFolder, function(error, filelist){
			console.log(filelist);
		})
	}

	/** Threejs 초기화 함수 */
	function initThree() {
		let container;
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		// set camera position
		camera.position.x = 0;
		camera.position.y = 6;
		camera.position.z = 0;

		// testing~ start
		rayCast = new THREE.Raycaster();
		mouse = new THREE.Vector2();
		mouse.x = mouse.y = -1;
		// testing~ end

		let renderer = new THREE.WebGLRenderer({ antialias: true });
		container = document.getElementById('main');
		// renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setSize(1100, 550);
		document.body.appendChild( renderer.domElement );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		container.appendChild(renderer.domElement);
		container.addEventListener('click', onMouseClick, false);

		// x,y,z lines
		/*
		* let axes = new THREE.AxesHelper(5); scene.add(axes);
		*/

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.minDistance = -50;
		controls.maxDistance = 10;
		
		object_controls = new THREE.DragControls( objarr, camera, renderer.domElement );
		object_controls.addEventListener( 'dragstart', dragStartCallback );
		object_controls.addEventListener( 'dragend', dragendCallback );
		

		function dragStartCallback(event) {
			controls.enabled = false;
			//startColor = event.object.material.color.getHex();
			//event.object.material.color.setHex(0x000000);
		}

		function dragendCallback(event) {
			controls.enabled = true;
			furniture_path = "";
			//event.object.material.color.setHex(startColor);
		}

		function animate() {
			requestAnimationFrame(animate);
			if (cl == 1) {
				// console.log('mode of inserting furniture!')
				camera.position.x = 0;
				camera.position.y = 6;
				camera.position.z = 0;
				object_controls.enabled = true;
			}
			else {object_controls.enabled = false;}
			renderer.render(scene, camera);
			controls.update();
		}

		animate();
	}
}
