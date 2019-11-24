var gl;
var furniture_path;

window.onload = function () {
  furniture_path = './furniture/bathroomCabinet.obj'
   let scene = new THREE.Scene();
   let light, gird, gridH, camera;
   let mouse;
   let loader; // OBJLoader 객체를 넣을 변수를 선언
   let cl, roomsize;
   let objarr = new Array();
   let mtlLoader; // MTLLoader 객체를 넣을 변수

   // testing~ start
   // mouse click event function
   let onMouseClick = function(e){
      if (cl==1) {
         // grid 변의 길이
		var wh = 360/(roomsize/2);
		console.log('wh=');
		console.log(wh);
		mouse.x = Math.round((e.clientX - 460) / wh);
		mouse.y = Math.round((e.clientY - 300) / wh);
		console.log(e.clientX, e.clientY);
		console.log(mouse.x, mouse.y);

		loadMTLLoader(mouse, furniture_path);
	}

}
   // testing~ end

   roomsize = document.getElementById("roomsize").innerText;

	var btn_plus = document.getElementById("plus");
	var btn_minus = document.getElementById("minus");
	var inner = document.getElementById("roomsize").innerText;
  var btn_bathroomMirror = document.getElementById("bathroomMirror");

	btn_plus.addEventListener("click", function(event) {
		if (Number(inner) < 20) {
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

  btn_bathroomMirror.addEventListener("click", function(event){
    furniture_path = './furniture/bathroomMirror.obj';
    console.log("furniture path ="+'./furniture/bathroomCabinet.obj')
  });

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
	  // size 고정
      var size = 8;
      var size = 8;
      grid = new THREE.Object3D();
      gridH = new THREE.GridHelper(size, roomsize, 0x0000ff, 0x808080);
      gridH.position.y = 0;
      gridH.position.x = 0;
      gridH.position.z = 0;
      grid.add(gridH);
      scene.add(grid);
   }

   /** .obj 파일의 모델을 로드하는 함수 */
   function loadObjLoader(position, obj, materials) {
      loader = new THREE.OBJLoader();
      loader.load(obj, function (object) {
         // set position of object
         object.position.set(position.x, 0, position.y);
		       object.scale.x = object.scale.y = object.scale.z = 3;
         //object.position.set(1, 0, 1);
         // add object
		 loader.setMaterials(materials);
		 objarr.push(object);
         scene.add(object);
      }, function (xhr) {
         // loading model
         console.log(xhr.loaded / xhr.total * 100, '% loaded');
      }, function (error) {
         // fail to load model
         alert('모델을 로드 중 오류가 발생하였습니다.');
      });
   }

   /** 텍스쳐 입히는 함수 */
   function loadMTLLoader(position, obj) {
       mtlLoader = new THREE.MTLLoader();
       var name = "."+obj.split(".")[1]+".mtl";
       console.log("mtl name="+name);
       // 로드할 Material 파일 명을 입력합니다.

       // [Start] 수정된 부분
       mtlLoader.load(name, function (materials) {
           // 로드 완료되었을때 호출하는 함수
           materials.preload();
           loadObjLoader(position, obj, materials);

           var obj_loader = new THREE.OBJLoader();
            obj_loader.setMaterials(materials)
            obj_loader.load(obj,
            function(object) {
                let mesh = object.children[0]
                scene.add(mesh);
            },
        )
       }// [End] 수정된 부분
       , function (error) {
           // 로드가 실패했을때 호출하는 함수
           console.error('MTLLoader 로드 중 오류가 발생하였습니다.', error);
           alert('MTLLoader 로드 중 오류가 발생하였습니다.');
       }
     );
   }

   //furnitre 이름 목록 불러오
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

      //testing~ start
      rayCast = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      mouse.x = mouse.y = -1;

      //testing~ end

      let renderer = new THREE.WebGLRenderer({
         antialias: true
      });
      container = document.getElementById('main');
      //renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(1100, 550);
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


// MTLloader.js
/**
 * Loads a Wavefront .mtl file specifying materials
 *
 * @author angelxuanchang
 */

THREE.MTLLoader = function ( manager ) {

   THREE.Loader.call( this, manager );

};

THREE.MTLLoader.prototype = Object.assign( Object.create( THREE.Loader.prototype ), {

   constructor: THREE.MTLLoader,

   /**
    * Loads and parses a MTL asset from a URL.
    *
    * @param {String} url - URL to the MTL file.
    * @param {Function} [onLoad] - Callback invoked with the loaded object.
    * @param {Function} [onProgress] - Callback for download progress.
    * @param {Function} [onError] - Callback for download errors.
    *
    * @see setPath setResourcePath
    *
    * @note In order for relative texture references to resolve correctly
    * you must call setResourcePath() explicitly prior to load.
    */
   load: function ( url, onLoad, onProgress, onError ) {

      var scope = this;

      var path = ( this.path === '' ) ? THREE.LoaderUtils.extractUrlBase( url ) : this.path;

      var loader = new THREE.FileLoader( this.manager );
      loader.setPath( this.path );
      loader.load( url, function ( text ) {

         onLoad( scope.parse( text, path ) );

      }, onProgress, onError );

   },

   setMaterialOptions: function ( value ) {

      this.materialOptions = value;
      return this;

   },

   /**
    * Parses a MTL file.
    *
    * @param {String} text - Content of MTL file
    * @return {THREE.MTLLoader.MaterialCreator}
    *
    * @see setPath setResourcePath
    *
    * @note In order for relative texture references to resolve correctly
    * you must call setResourcePath() explicitly prior to parse.
    */
   parse: function ( text, path ) {

      var lines = text.split( '\n' );
      var info = {};
      var delimiter_pattern = /\s+/;
      var materialsInfo = {};

      for ( var i = 0; i < lines.length; i ++ ) {

         var line = lines[ i ];
         line = line.trim();

         if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

            // Blank line or comment ignore
            continue;

         }

         var pos = line.indexOf( ' ' );

         var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
         key = key.toLowerCase();

         var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : '';
         value = value.trim();

         if ( key === 'newmtl' ) {

            // New material

            info = { name: value };
            materialsInfo[ value ] = info;

         } else {

            if ( key === 'ka' || key === 'kd' || key === 'ks' || key === 'ke' ) {

               var ss = value.split( delimiter_pattern, 3 );
               info[ key ] = [ parseFloat( ss[ 0 ] ), parseFloat( ss[ 1 ] ), parseFloat( ss[ 2 ] ) ];

            } else {

               info[ key ] = value;

            }

         }

      }

      var materialCreator = new THREE.MTLLoader.MaterialCreator( this.resourcePath || path, this.materialOptions );
      materialCreator.setCrossOrigin( this.crossOrigin );
      materialCreator.setManager( this.manager );
      materialCreator.setMaterials( materialsInfo );
      return materialCreator;

   }

} );

/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 * @constructor
 */

THREE.MTLLoader.MaterialCreator = function ( baseUrl, options ) {

   this.baseUrl = baseUrl || '';
   this.options = options;
   this.materialsInfo = {};
   this.materials = {};
   this.materialsArray = [];
   this.nameLookup = {};

   this.side = ( this.options && this.options.side ) ? this.options.side : THREE.FrontSide;
   this.wrap = ( this.options && this.options.wrap ) ? this.options.wrap : THREE.RepeatWrapping;

};

THREE.MTLLoader.MaterialCreator.prototype = {

   constructor: THREE.MTLLoader.MaterialCreator,

   crossOrigin: 'anonymous',

   setCrossOrigin: function ( value ) {

      this.crossOrigin = value;
      return this;

   },

   setManager: function ( value ) {

      this.manager = value;

   },

   setMaterials: function ( materialsInfo ) {

      this.materialsInfo = this.convert( materialsInfo );
      this.materials = {};
      this.materialsArray = [];
      this.nameLookup = {};

   },

   convert: function ( materialsInfo ) {

      if ( ! this.options ) return materialsInfo;

      var converted = {};

      for ( var mn in materialsInfo ) {

         // Convert materials info into normalized form based on options

         var mat = materialsInfo[ mn ];

         var covmat = {};

         converted[ mn ] = covmat;

         for ( var prop in mat ) {

            var save = true;
            var value = mat[ prop ];
            var lprop = prop.toLowerCase();

            switch ( lprop ) {

               case 'kd':
               case 'ka':
               case 'ks':

                  // Diffuse color (color under white light) using RGB values

                  if ( this.options && this.options.normalizeRGB ) {

                     value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

                  }

                  if ( this.options && this.options.ignoreZeroRGBs ) {

                     if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 2 ] === 0 ) {

                        // ignore

                        save = false;

                     }

                  }

                  break;

               default:

                  break;

            }

            if ( save ) {

               covmat[ lprop ] = value;

            }

         }

      }

      return converted;

   },

   preload: function () {

      for ( var mn in this.materialsInfo ) {

         this.create( mn );

      }

   },

   getIndex: function ( materialName ) {

      return this.nameLookup[ materialName ];

   },

   getAsArray: function () {

      var index = 0;

      for ( var mn in this.materialsInfo ) {

         this.materialsArray[ index ] = this.create( mn );
         this.nameLookup[ mn ] = index;
         index ++;

      }

      return this.materialsArray;

   },

   create: function ( materialName ) {

      if ( this.materials[ materialName ] === undefined ) {

         this.createMaterial_( materialName );

      }

      return this.materials[ materialName ];

   },

   createMaterial_: function ( materialName ) {

      // Create material

      var scope = this;
      var mat = this.materialsInfo[ materialName ];
      var params = {

         name: materialName,
         side: this.side

      };

      function resolveURL( baseUrl, url ) {

         if ( typeof url !== 'string' || url === '' )
            return '';

         // Absolute URL
         if ( /^https?:\/\//i.test( url ) ) return url;

         return baseUrl + url;

      }

      function setMapForType( mapType, value ) {

         if ( params[ mapType ] ) return; // Keep the first encountered texture

         var texParams = scope.getTextureParams( value, params );
         var map = scope.loadTexture( resolveURL( scope.baseUrl, texParams.url ) );

         map.repeat.copy( texParams.scale );
         map.offset.copy( texParams.offset );

         map.wrapS = scope.wrap;
         map.wrapT = scope.wrap;

         params[ mapType ] = map;

      }

      for ( var prop in mat ) {

         var value = mat[ prop ];
         var n;

         if ( value === '' ) continue;

         switch ( prop.toLowerCase() ) {

            // Ns is material specular exponent

            case 'kd':

               // Diffuse color (color under white light) using RGB values

               params.color = new THREE.Color().fromArray( value );

               break;

            case 'ks':

               // Specular color (color when light is reflected from shiny surface) using RGB values
               params.specular = new THREE.Color().fromArray( value );

               break;

            case 'ke':

               // Emissive using RGB values
               params.emissive = new THREE.Color().fromArray( value );

               break;

            case 'map_kd':

               // Diffuse texture map

               setMapForType( "map", value );

               break;

            case 'map_ks':

               // Specular map

               setMapForType( "specularMap", value );

               break;

            case 'map_ke':

               // Emissive map

               setMapForType( "emissiveMap", value );

               break;

            case 'norm':

               setMapForType( "normalMap", value );

               break;

            case 'map_bump':
            case 'bump':

               // Bump texture map

               setMapForType( "bumpMap", value );

               break;

            case 'map_d':

               // Alpha map

               setMapForType( "alphaMap", value );
               params.transparent = true;

               break;

            case 'ns':

               // The specular exponent (defines the focus of the specular highlight)
               // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

               params.shininess = parseFloat( value );

               break;

            case 'd':
               n = parseFloat( value );

               if ( n < 1 ) {

                  params.opacity = n;
                  params.transparent = true;

               }

               break;

            case 'tr':
               n = parseFloat( value );

               if ( this.options && this.options.invertTrProperty ) n = 1 - n;

               if ( n > 0 ) {

                  params.opacity = 1 - n;
                  params.transparent = true;

               }

               break;

            default:
               break;

         }

      }

      this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
      return this.materials[ materialName ];

   },

   getTextureParams: function ( value, matParams ) {

      var texParams = {

         scale: new THREE.Vector2( 1, 1 ),
         offset: new THREE.Vector2( 0, 0 )

       };

      var items = value.split( /\s+/ );
      var pos;

      pos = items.indexOf( '-bm' );

      if ( pos >= 0 ) {

         matParams.bumpScale = parseFloat( items[ pos + 1 ] );
         items.splice( pos, 2 );

      }

      pos = items.indexOf( '-s' );

      if ( pos >= 0 ) {

         texParams.scale.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
         items.splice( pos, 4 ); // we expect 3 parameters here!

      }

      pos = items.indexOf( '-o' );

      if ( pos >= 0 ) {

         texParams.offset.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
         items.splice( pos, 4 ); // we expect 3 parameters here!

      }

      texParams.url = items.join( ' ' ).trim();
      return texParams;

   },

   loadTexture: function ( url, mapping, onLoad, onProgress, onError ) {

      var texture;
      var manager = ( this.manager !== undefined ) ? this.manager : THREE.DefaultLoadingManager;
      var loader = manager.getHandler( url );

      if ( loader === null ) {

         loader = new THREE.TextureLoader( manager );

      }

      if ( loader.setCrossOrigin ) loader.setCrossOrigin( this.crossOrigin );
      texture = loader.load( url, onLoad, onProgress, onError );

      if ( mapping !== undefined ) texture.mapping = mapping;

      return texture;

   }

};
