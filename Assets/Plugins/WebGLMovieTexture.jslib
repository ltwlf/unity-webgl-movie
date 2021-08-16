var LibraryWebGLMovieTexture = {
  $videoInstances: [],

  WebGLMovieTextureCreate: function (url) {
    window.alert("test");
    var str = Pointer_stringify(url);
    var video = document.createElement("video");

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        console.log("cam");
        video.srcObject = stream;
      });

    // video.style.display = 'none';
    //video.src = str;
    // document.body.appendChild(video);
    return videoInstances.push(video) - 1;
  },

  WebGLMovieTextureUpdate: function (video, tex) {
    console.log(tex + " - " + video);
    if (videoInstances[video].paused) return;

    GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[tex]);
    GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, true);
    GLctx.texImage2D(
      GLctx.TEXTURE_2D,
      0,
      GLctx.RGBA,
      GLctx.RGBA,
      GLctx.UNSIGNED_BYTE,
      videoInstances[video]
    );
    GLctx.pixelStorei(GLctx.UNPACK_FLIP_Y_WEBGL, false);
  },

  WebGLMovieTexturePlay: function (video) {
    videoInstances[video].play();
  },

  WebGLMovieTexturePause: function (video) {
    videoInstances[video].pause();
  },

  WebGLMovieTextureSeek: function (video, time) {
    videoInstances[video].currentTime = time;
  },

  WebGLMovieTextureLoop: function (video, loop) {
    videoInstances[video].loop = loop;
  },

  WebGLMovieTextureHeight: function (video) {
    return videoInstances[video].videoHeight;
  },

  WebGLMovieTextureWidth: function (video) {
    return videoInstances[video].videoWidth;
  },

  WebGLMovieTextureTime: function (video) {
    return videoInstances[video].currentTime;
  },

  WebGLMovieTextureDuration: function (video) {
    return videoInstances[video].duration;
  },

  WebGLMovieTextureIsReady: function (video) {
    return true;
    return (
      videoInstances[video].readyState >=
      videoInstances[video].HAVE_CURRENT_DATA
    );
  },
};
autoAddDeps(LibraryWebGLMovieTexture, "$videoInstances");
mergeInto(LibraryManager.library, LibraryWebGLMovieTexture);
