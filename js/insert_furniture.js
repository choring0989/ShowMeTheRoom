var gl;

window.onload = function () {
   let scene = new THREE.Scene();
   let light, gird, gridH, camera;
   let rayCast, mouse;   
   let loader; // OBJLoader 객체를 넣을 변수를 선언
   let cl;
   // testing~ start
   // mouse click event function
   let onMouseClick = function(e){
      if (cl==1) {
         let gap1 = e.clientX - e.offsetX;
         let gap2 = e.clientY - e.offsetY;
         mouse.x = ((e.clientX - gap1) / (window.innerWidth)) * 2 - 1;
         mouse.y = -((e.clientY - gap2) / (window.innerHeight)) * 2 + 1;
         console.log(mouse.x, mouse.y);
         rayCast.setFromCamera(mouse,camera);
         loadObjLoader(rayCast.ray.at(10), './furniture/bathroomCabinet.obj');
         //loadObjLoader(mouse, './furniture/bathroomCabinet.obj');
      }
   }
   // testing~ end
   
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
   });
   
   /** *************Change View Space Mode********************** */
    var ViewButton = document.getElementById("view");
   ViewButton.addEventListener("click", function(event) { 
        cl=0;
   });
   
   /*
   // click event for inserting furniture
    window.addEventListener("click", function(event){
      if(cl==1&&event.clientY>50){   
        // check log
      console.log('clcik event listener');
      console.log(event.clientX, event.clientY);
      // load OBJ file
      loadObjLoader(position, './furniture/bathroomCabinet.obj');
      // console.log(loader.position);
        }
    } );
*/
   /** DirectionalLight를 추가하는 함수 */
   function addDirectionalLight() {
      light = new THREE.DirectionalLight(0xffffff, 1);
      light.castShadow = true;
      light.position.x = 5;
      light.position.y = 5;
      light.position.z = 5;
      scene.add(light);
   }
   
   /** GridHelper를 추가하는 함수 */
   function addGridView() {
      // add grid
      var size = 10;
      var divisions = 10;
      grid = new THREE.Object3D();
      gridH = new THREE.GridHelper(size, divisions, 0x0000ff, 0x808080);
      gridH.position.y = 0;
      gridH.position.x = 0;
      gridH.position.z = 0;
      gridH.rotation.x = 0;
      grid.add(gridH);
      scene.add(grid);
   }

   /** .obj 파일의 모델을 로드하는 함수 */
   function loadObjLoader(position, obj) {
      loader = new THREE.OBJLoader();
      loader.load(obj, function (object) {
         // set position of object
         object.position.set(position.x, 0, position.y);
         //object.position.set(1, 0, 1);
         // add object
         scene.add(object);
      }, function (xhr) {
         // loading model
         console.log(xhr.loaded / xhr.total * 100, '% loaded');
      }, function (error) {
         // fail to load model
         alert('모델을 로드 중 오류가 발생하였습니다.');
      });
   }

   /** Threejs 초기화 함수 */
   function initThree() {
      let container;
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
      // set camera position
      camera.position.x = 0;
      camera.position.y = 6;
      camera.position.z = 0;
      
      //testing~ start
      rayCast = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      mouse.x = mouse.y = -1;
      
      //testing~ end
      
      let renderer = new THREE.WebGLRenderer({
         antialias: true
      });
      container = document.getElementById('main');
      renderer.setSize(container.offsetWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild( renderer.domElement );
      renderer.domElement.addEventListener('click', onMouseClick, false);
      document.body.appendChild(renderer.domElement);

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
      
      function animate() {
         requestAnimationFrame(animate);
         if (cl == 1) {
            // console.log('mode of inserting furniture!')
            camera.position.x = 0;
            camera.position.y = 6;
            camera.position.z = 0;
         }
         else {
         }
         renderer.render(scene, camera);
         controls.update();
      }

      animate();
   }
}