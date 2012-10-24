//var engine = startCopperLichtFromFile('3darea', 'copperlichtdata/game_scene.ccbjs');
var engine = new CL3D.CopperLicht('3darea', false, 60,false); 
	engine.load('copperlichtdata/level0.ccbjs');
var camera, camAnimator, light;
var scene;
var paused = false;
var newMaterialType;

var context2d;

var screenWidth = 1024, screenHeight = 768;

document.body.style.overflow = "hidden";

var context;

function update() {
    player.update();
    updateWorld();
    enemy.update();
    updateBullets();
    updateForCollisions();
	var camPos = player.node.Pos.clone();
	shipLookAt = player.direction.clone();
	shipLookAt.normalize();
	shipLookAt.multiplyThisWithScal(15);
	camPos.substractFromThis(shipLookAt);
	camPos.Y += 21;
	scene.getActiveCamera().Pos = camPos;
	//light.Pos = scene.getActiveCamera().Pos;
    //camAnimator.lookAt(player.node.Pos);
	camAnimator.lookAt(player.node.Pos.add(new CL3D.Vect3d(0, 15, 0)));
	
}

// this is called when loading the 3d scene has finished
engine.OnLoadingComplete = function () {
    //context2d = document.getElementById('2dcanvas').getContext('2d');
    chat("witch","some text");
    scene = engine.getScene();
    if (scene) {
        hideSceneObjects();
        initWorld();

        // also, force the 3d engine to update the scene every frame
        scene.setRedrawMode(CL3D.Scene.REDRAW_EVERY_FRAME);

        camPos = player.node.Pos.clone();
        camPos.X += 21;
        camPos.Y += 20;
        scene.getActiveCamera().Pos = camPos;

        camAnimator = new CL3D.AnimatorCameraFPS(scene.getActiveCamera(), engine);
        camAnimator.onKeyUp = camAnimator.onKeyDown = function (event) { };
        camAnimator.MayMove = false;
        scene.getActiveCamera().addAnimator(camAnimator);
        //camAnimator.setMayMove(false);
        camAnimator.lookAt(player.node.Pos);


        light1 = new CL3D.LightSceneNode();
        light2 = new CL3D.LightSceneNode();
        scene.getActiveCamera().addChild(light1);
        scene.getActiveCamera().addChild(light2);
        //scene.getRootSceneNode().addChild(light);
        light1.Pos = scene.getActiveCamera().Pos.add(new CL3D.Vect3d(0, -100, 0));
        light2.Pos = scene.getActiveCamera().Pos.add(new CL3D.Vect3d(0, 150, 0));
        light1.Attenuation = Infinity; // = light2.Attenuation = Infinity;

        scene.AmbientLight.R = scene.AmbientLight.G = scene.AmbientLight.B = 0.5;

        engine.OnAnimate = update;

        var vertex_shader_source = // "varying vec3 normal; varying vec3 ec_pos; void main()  {  vec4 color = vec4(0.3, 0.7, 1.0, 1.0); vec3 light = vec3( gl_LightSource[0].position ); vec3 lightdir = light - ec_pos; vec3 reflectVec = normalize(reflect( -lightdir, normal )); vec3 viewVec = normalize( -ec_pos );//Diffuse intensityfloat diff = max( dot(normalize(lightdir), normalize(normal)), 0.0); //Specular intensity float spec = 0.0; //Specular intensityif (diff > 0.0)   {  spec = max(dot(reflectVec, viewVec), 0.0);//The specular highlight only gets smaller when //raised to some power. //Leaving it out gives a nice big highlight. //spec = pow(spec, 16.0);  }  diff =  diff * 0.6 + spec * 0.4; //Diffuse intensity if (diff > 0.90)  diff = 1.1; else if (diff > 0.5)  diff = 0.7; else diff = 0.5; gl_FragColor = color * diff;}";
                "\
        		   #ifdef GL_ES                    \n\
        		   precision highp float;          \n\
        		   #endif                          \n\
        		   uniform mat4 worldviewproj;     \
        		   attribute vec4 vPosition;       \
        		   attribute vec4 vNormal;         \
        		   attribute vec2 vTexCoord1;      \
        		   attribute vec2 vTexCoord2;      \
        		   varying vec2 v_texCoord1;       \
        		   varying vec2 v_texCoord2;       \
        		   void main()                     \
        		   {                               \
        			gl_Position = worldviewproj * vPosition;\
        			v_texCoord1 = vTexCoord1.st;   \
        			v_texCoord2 = vTexCoord2.st;   \
        		   }";

        var fragment_shader_source = //"//Interpolates the vertex normal across the texture fragmentvarying vec3 normal;//Interpolate the texel position in eye space.varying vec3 ec_pos;void main(){normal = gl_NormalMatrix * gl_Normal;ec_pos = gl_ModelViewMatrix * gl_Vertex;//Perform fixed transformation for the vertexgl_Position = ftransform();	}";


        "\
        #ifdef GL_ES                    \n\
        precision highp float;          \n\
        #endif                          \n\
        uniform sampler2D texture1;     \
        uniform sampler2D texture2;     \
        \
        varying vec2 v_texCoord1;       \
        varying vec2 v_texCoord2;       \
        \
        void main()                     \
        {                               \
        vec2 texCoord = vec2(v_texCoord1.s, v_texCoord1.t);  \
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  \
        }";

        newMaterialType = engine.getRenderer().createMaterialType(vertex_shader_source, fragment_shader_source);
    }
}
