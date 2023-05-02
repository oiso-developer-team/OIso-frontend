! function(t) {
	function i(r) {
		if (e[r]) return e[r].exports;
		var o = e[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return t[r].call(o.exports, o, o.exports, i), o.l = !0, o.exports
	}
	var e = {};
	i.m = t, i.c = e, i.d = function(t, e, r) {
		i.o(t, e) || Object.defineProperty(t, e, {
			configurable: !1,
			enumerable: !0,
			get: r
		})
	}, i.n = function(t) {
		var e = t && t.__esModule ? function() {
			return t.default
		} : function() {
			return t
		};
		return i.d(e, "a", e), e
	}, i.o = function(t, i) {
		return Object.prototype.hasOwnProperty.call(t, i)
	}, i.p = "", i(i.s = 4)
}([function(t, i, e) {
	"use strict";

	function r() {
		this.live2DModel = null, this.modelMatrix = null, this.eyeBlink = null, this.physics = null, this.pose = null, this.debugMode = !1, this.initialized = !1, this.updating = !1, this.alpha = 1, this.accAlpha = 0, this.lipSync = !1, this.lipSyncValue = 0, this.accelX = 0, this.accelY = 0, this.accelZ = 0, this.dragX = 0, this.dragY = 0, this.startTimeMSec = null, this.mainMotionManager = new h, this.expressionManager = new h, this.motions = {}, this.expressions = {}, this.isTexLoaded = !1
	}

	function o() {
		AMotion.prototype.constructor.call(this), this.paramList = new Array
	}

	function n() {
		this.id = "", this.type = -1, this.value = null
	}

	function s() {
		this.nextBlinkTime = null, this.stateStartTime = null, this.blinkIntervalMsec = null, this.eyeState = g.STATE_FIRST, this.blinkIntervalMsec = 4e3, this.closingMotionMsec = 100, this.closedMotionMsec = 50, this.openingMotionMsec = 150, this.closeIfZero = !0, this.eyeID_L = "PARAM_EYE_L_OPEN", this.eyeID_R = "PARAM_EYE_R_OPEN"
	}

	function _() {
		this.tr = new Float32Array(16), this.identity()
	}

	function a(t, i) {
		_.prototype.constructor.call(this), this.width = t, this.height = i
	}

	function h() {
		MotionQueueManager.prototype.constructor.call(this), this.currentPriority = null, this.reservePriority = null, this.super = MotionQueueManager.prototype
	}

	function l() {
		this.physicsList = new Array, this.startTimeMSec = UtSystem.getUserTimeMSec()
	}

	function $() {
		this.lastTime = 0, this.lastModel = null, this.partsGroups = new Array
	}

	function u(t) {
		this.paramIndex = -1, this.partsIndex = -1, this.link = null, this.id = t
	}

	function p() {
		this.EPSILON = .01, this.faceTargetX = 0, this.faceTargetY = 0, this.faceX = 0, this.faceY = 0, this.faceVX = 0, this.faceVY = 0, this.lastTimeSec = 0
	}

	function f() {
		_.prototype.constructor.call(this), this.screenLeft = null, this.screenRight = null, this.screenTop = null, this.screenBottom = null, this.maxLeft = null, this.maxRight = null, this.maxTop = null, this.maxBottom = null, this.max = Number.MAX_VALUE, this.min = 0
	}

	function c() {}
	var d = 0;
	r.prototype.getModelMatrix = function() {
		return this.modelMatrix
	}, r.prototype.setAlpha = function(t) {
		t > .999 && (t = 1), t < .001 && (t = 0), this.alpha = t
	}, r.prototype.getAlpha = function() {
		return this.alpha
	}, r.prototype.isInitialized = function() {
		return this.initialized
	}, r.prototype.setInitialized = function(t) {
		this.initialized = t
	}, r.prototype.isUpdating = function() {
		return this.updating
	}, r.prototype.setUpdating = function(t) {
		this.updating = t
	}, r.prototype.getLive2DModel = function() {
		return this.live2DModel
	}, r.prototype.setLipSync = function(t) {
		this.lipSync = t
	}, r.prototype.setLipSyncValue = function(t) {
		this.lipSyncValue = t
	}, r.prototype.setAccel = function(t, i, e) {
		this.accelX = t, this.accelY = i, this.accelZ = e
	}, r.prototype.setDrag = function(t, i) {
		this.dragX = t, this.dragY = i
	}, r.prototype.getMainMotionManager = function() {
		return this.mainMotionManager
	}, r.prototype.getExpressionManager = function() {
		return this.expressionManager
	}, r.prototype.loadModelData = function(t, i) {
		var e = c.getPlatformManager();
		this.debugMode && e.log("Load model : " + t);
		var r = this;
		e.loadLive2DModel(t, function(t) {
			if (r.live2DModel = t, r.live2DModel.saveParam(), 0 != Live2D.getError()) return void console.error("Error : Failed to loadModelData().");
			r.modelMatrix = new a(r.live2DModel.getCanvasWidth(), r.live2DModel.getCanvasHeight()), r.modelMatrix.setWidth(2), r.modelMatrix.setCenterPosition(0, 0), i(r.live2DModel)
		})
	}, r.prototype.loadTexture = function(t, i, e) {
		d++;
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Texture : " + i);
		var o = this;
		r.loadTexture(this.live2DModel, t, i, function() {
			d--, 0 == d && (o.isTexLoaded = !0), "function" == typeof e && e()
		})
	}, r.prototype.loadMotion = function(t, i, e) {
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Motion : " + i);
		var o = null,
			n = this;
		r.loadBytes(i, function(i) {
			o = Live2DMotion.loadMotion(i), null != t && (n.motions[t] = o), e(o)
		})
	}, r.prototype.loadExpression = function(t, i, e) {
		var r = c.getPlatformManager();
		this.debugMode && r.log("Load Expression : " + i);
		var n = this;
		r.loadBytes(i, function(i) {
			null != t && (n.expressions[t] = o.loadJson(i)), "function" == typeof e && e()
		})
	}, r.prototype.loadPose = function(t, i) {
		var e = c.getPlatformManager();
		this.debugMode && e.log("Load Pose : " + t);
		var r = this;
		try {
			e.loadBytes(t, function(t) {
				r.pose = $.load(t), "function" == typeof i && i()
			})
		} catch (t) {
			console.warn(t)
		}
	}, r.prototype.loadPhysics = function(t) {
		var i = c.getPlatformManager();
		this.debugMode && i.log("Load Physics : " + t);
		var e = this;
		try {
			i.loadBytes(t, function(t) {
				e.physics = l.load(t)
			})
		} catch (t) {
			console.warn(t)
		}
	}, r.prototype.hitTestSimple = function(t, i, e) {
		if (null === this.live2DModel) return !1;
		var r = this.live2DModel.getDrawDataIndex(t);
		if (r < 0) return !1;
		for (var o = this.live2DModel.getTransformedPoints(r), n = this.live2DModel.getCanvasWidth(), s = 0, _ = this.live2DModel.getCanvasHeight(), a = 0, h = 0; h < o.length; h += 2) {
			var l = o[h],
				$ = o[h + 1];
			l < n && (n = l), l > s && (s = l), $ < _ && (_ = $), $ > a && (a = $)
		}
		var u = this.modelMatrix.invertTransformX(i),
			p = this.modelMatrix.invertTransformY(e);
		return n <= u && u <= s && _ <= p && p <= a
	}, r.prototype.hitTestSimpleCustom = function(t, i, e, r) {
		return null !== this.live2DModel && (e >= t[0] && e <= i[0] && r <= t[1] && r >= i[1])
	}, o.prototype = new AMotion, o.EXPRESSION_DEFAULT = "DEFAULT", o.TYPE_SET = 0, o.TYPE_ADD = 1, o.TYPE_MULT = 2, o.loadJson = function(t) {
		var i = new o,
			e = c.getPlatformManager(),
			r = e.jsonParseFromBytes(t);
		if (i.setFadeIn(parseInt(r.fade_in) > 0 ? parseInt(r.fade_in) : 1e3), i.setFadeOut(parseInt(r.fade_out) > 0 ? parseInt(r.fade_out) : 1e3), null == r.params) return i;
		var s = r.params,
			_ = s.length;
		i.paramList = [];
		for (var a = 0; a < _; a++) {
			var h = s[a],
				l = h.id.toString(),
				$ = parseFloat(h.val),
				u = o.TYPE_ADD,
				p = null != h.calc ? h.calc.toString() : "add";
			if ((u = "add" === p ? o.TYPE_ADD : "mult" === p ? o.TYPE_MULT : "set" === p ? o.TYPE_SET : o.TYPE_ADD) == o.TYPE_ADD) {
				var f = null == h.def ? 0 : parseFloat(h.def);
				$ -= f
			} else if (u == o.TYPE_MULT) {
				var f = null == h.def ? 1 : parseFloat(h.def);
				0 == f && (f = 1), $ /= f
			}
			var d = new n;
			d.id = l, d.type = u, d.value = $, i.paramList.push(d)
		}
		return i
	}, o.prototype.updateParamExe = function(t, i, e, r) {
		for (var n = this.paramList.length - 1; n >= 0; --n) {
			var s = this.paramList[n];
			s.type == o.TYPE_ADD ? t.addToParamFloat(s.id, s.value, e) : s.type == o.TYPE_MULT ? t.multParamFloat(s.id, s.value, e) : s.type == o.TYPE_SET && t.setParamFloat(s.id, s.value, e)
		}
	}, s.prototype.calcNextBlink = function() {
		return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
	}, s.prototype.setInterval = function(t) {
		this.blinkIntervalMsec = t
	}, s.prototype.setEyeMotion = function(t, i, e) {
		this.closingMotionMsec = t, this.closedMotionMsec = i, this.openingMotionMsec = e
	}, s.prototype.updateParam = function(t) {
		var i, e = UtSystem.getUserTimeMSec(),
			r = 0;
		switch (this.eyeState) {
			case g.STATE_CLOSING:
				r = (e - this.stateStartTime) / this.closingMotionMsec, r >= 1 && (r = 1, this.eyeState = g.STATE_CLOSED, this.stateStartTime = e), i = 1 - r;
				break;
			case g.STATE_CLOSED:
				r = (e - this.stateStartTime) / this.closedMotionMsec, r >= 1 && (this.eyeState = g.STATE_OPENING, this.stateStartTime = e), i = 0;
				break;
			case g.STATE_OPENING:
				r = (e - this.stateStartTime) / this.openingMotionMsec, r >= 1 && (r = 1, this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink()), i = r;
				break;
			case g.STATE_INTERVAL:
				this.nextBlinkTime < e && (this.eyeState = g.STATE_CLOSING, this.stateStartTime = e), i = 1;
				break;
			case g.STATE_FIRST:
			default:
				this.eyeState = g.STATE_INTERVAL, this.nextBlinkTime = this.calcNextBlink(), i = 1
		}
		this.closeIfZero || (i = -i), t.setParamFloat(this.eyeID_L, i), t.setParamFloat(this.eyeID_R, i)
	};
	var g = function() {};
	g.STATE_FIRST = "STATE_FIRST", g.STATE_INTERVAL = "STATE_INTERVAL", g.STATE_CLOSING = "STATE_CLOSING", g.STATE_CLOSED = "STATE_CLOSED", g.STATE_OPENING = "STATE_OPENING", _.mul = function(t, i, e) {
		var r, o, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (r = 0; r < 4; r++)
			for (o = 0; o < 4; o++)
				for (n = 0; n < 4; n++) s[r + 4 * o] += t[r + 4 * n] * i[n + 4 * o];
		for (r = 0; r < 16; r++) e[r] = s[r]
	}, _.prototype.identity = function() {
		for (var t = 0; t < 16; t++) this.tr[t] = t % 5 == 0 ? 1 : 0
	}, _.prototype.getArray = function() {
		return this.tr
	}, _.prototype.getCopyMatrix = function() {
		return new Float32Array(this.tr)
	}, _.prototype.setMatrix = function(t) {
		if (null != this.tr && this.tr.length == this.tr.length)
			for (var i = 0; i < 16; i++) this.tr[i] = t[i]
	}, _.prototype.getScaleX = function() {
		return this.tr[0]
	}, _.prototype.getScaleY = function() {
		return this.tr[5]
	}, _.prototype.transformX = function(t) {
		return this.tr[0] * t * 8 / 3 + this.tr[12]
	}, _.prototype.transformY = function(t) {
		return this.tr[5] * t * 8 / 3 + this.tr[13]
	}, _.prototype.invertTransformX = function(t) {
		return (t - this.tr[12]) / this.tr[0]
	}, _.prototype.invertTransformY = function(t) {
		return (t - this.tr[13]) / this.tr[5]
	}, _.prototype.multTranslate = function(t, i) {
		var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
		_.mul(e, this.tr, this.tr)
	}, _.prototype.translate = function(t, i) {
		this.tr[12] = t, this.tr[13] = i
	}, _.prototype.translateX = function(t) {
		this.tr[12] = t
	}, _.prototype.translateY = function(t) {
		this.tr[13] = t
	}, _.prototype.multScale = function(t, i) {
		var e = [t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		_.mul(e, this.tr, this.tr)
	}, _.prototype.scale = function(t, i) {
		this.tr[0] = t, this.tr[5] = i
	}, a.prototype = new _, a.prototype.setPosition = function(t, i) {
		this.translate(t, i)
	}, a.prototype.setCenterPosition = function(t, i) {
		var e = this.width * this.getScaleX(),
			r = this.height * this.getScaleY();
		this.translate(t - e / 2, i - r / 2)
	}, a.prototype.top = function(t) {
		this.setY(t)
	}, a.prototype.bottom = function(t) {
		var i = this.height * this.getScaleY();
		this.translateY(t - i)
	}, a.prototype.left = function(t) {
		this.setX(t)
	}, a.prototype.right = function(t) {
		var i = this.width * this.getScaleX();
		this.translateX(t - i)
	}, a.prototype.centerX = function(t) {
		var i = this.width * this.getScaleX();
		this.translateX(t - i / 2)
	}, a.prototype.centerY = function(t) {
		var i = this.height * this.getScaleY();
		this.translateY(t - i / 2)
	}, a.prototype.setX = function(t) {
		this.translateX(t)
	}, a.prototype.setY = function(t) {
		this.translateY(t)
	}, a.prototype.setHeight = function(t) {
		var i = t / this.height,
			e = -i;
		this.scale(i, e)
	}, a.prototype.setWidth = function(t) {
		var i = t / this.width,
			e = -i;
		this.scale(i, e)
	}, h.prototype = new MotionQueueManager, h.prototype.getCurrentPriority = function() {
		return this.currentPriority
	}, h.prototype.getReservePriority = function() {
		return this.reservePriority
	}, h.prototype.reserveMotion = function(t) {
		return !(this.reservePriority >= t) && (!(this.currentPriority >= t) && (this.reservePriority = t, !0))
	}, h.prototype.setReservePriority = function(t) {
		this.reservePriority = t
	}, h.prototype.updateParam = function(t) {
		var i = MotionQueueManager.prototype.updateParam.call(this, t);
		return this.isFinished() && (this.currentPriority = 0), i
	}, h.prototype.startMotionPrio = function(t, i) {
		return i == this.reservePriority && (this.reservePriority = 0), this.currentPriority = i, this.startMotion(t, !1)
	}, l.load = function(t) {
		for (var i = new l, e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.physics_hair, n = o.length, s = 0; s < n; s++) {
			var _ = o[s],
				a = new PhysicsHair,
				h = _.setup,
				$ = parseFloat(h.length),
				u = parseFloat(h.regist),
				p = parseFloat(h.mass);
			a.setup($, u, p);
			for (var f = _.src, d = f.length, g = 0; g < d; g++) {
				var y = f[g],
					m = y.id,
					T = PhysicsHair.Src.SRC_TO_X,
					P = y.ptype;
				"x" === P ? T = PhysicsHair.Src.SRC_TO_X : "y" === P ? T = PhysicsHair.Src.SRC_TO_Y : "angle" === P ? T = PhysicsHair.Src.SRC_TO_G_ANGLE : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
				var S = parseFloat(y.scale),
					v = parseFloat(y.weight);
				a.addSrcParam(T, m, S, v)
			}
			for (var L = _.targets, M = L.length, g = 0; g < M; g++) {
				var E = L[g],
					m = E.id,
					T = PhysicsHair.Target.TARGET_FROM_ANGLE,
					P = E.ptype;
				"angle" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE : "angle_v" === P ? T = PhysicsHair.Target.TARGET_FROM_ANGLE_V : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
				var S = parseFloat(E.scale),
					v = parseFloat(E.weight);
				a.addTargetParam(T, m, S, v)
			}
			i.physicsList.push(a)
		}
		return i
	}, l.prototype.updateParam = function(t) {
		for (var i = UtSystem.getUserTimeMSec() - this.startTimeMSec, e = 0; e < this.physicsList.length; e++) this.physicsList[e].update(t, i)
	}, $.load = function(t) {
		for (var i = new $, e = c.getPlatformManager(), r = e.jsonParseFromBytes(t), o = r.parts_visible, n = o.length, s = 0; s < n; s++) {
			for (var _ = o[s], a = _.group, h = a.length, l = new Array, p = 0; p < h; p++) {
				var f = a[p],
					d = new u(f.id);
				if (l[p] = d, null != f.link) {
					var g = f.link,
						y = g.length;
					d.link = new Array;
					for (var m = 0; m < y; m++) {
						var T = new u(g[m]);
						d.link.push(T)
					}
				}
			}
			i.partsGroups.push(l)
		}
		return i
	}, $.prototype.updateParam = function(t) {
		if (null != t) {
			t != this.lastModel && this.initParam(t), this.lastModel = t;
			var i = UtSystem.getUserTimeMSec(),
				e = 0 == this.lastTime ? 0 : (i - this.lastTime) / 1e3;
			this.lastTime = i, e < 0 && (e = 0);
			for (var r = 0; r < this.partsGroups.length; r++) this.normalizePartsOpacityGroup(t, this.partsGroups[r], e), this.copyOpacityOtherParts(t, this.partsGroups[r])
		}
	}, $.prototype.initParam = function(t) {
		if (null != t)
			for (var i = 0; i < this.partsGroups.length; i++)
				for (var e = this.partsGroups[i], r = 0; r < e.length; r++) {
					e[r].initIndex(t);
					var o = e[r].partsIndex,
						n = e[r].paramIndex;
					if (!(o < 0)) {
						var s = 0 != t.getParamFloat(n);
						if (t.setPartsOpacity(o, s ? 1 : 0), t.setParamFloat(n, s ? 1 : 0), null != e[r].link)
							for (var _ = 0; _ < e[r].link.length; _++) e[r].link[_].initIndex(t)
					}
				}
	}, $.prototype.normalizePartsOpacityGroup = function(t, i, e) {
		for (var r = -1, o = 1, n = 0; n < i.length; n++) {
			var s = i[n].partsIndex,
				_ = i[n].paramIndex;
			if (!(s < 0) && 0 != t.getParamFloat(_)) {
				if (r >= 0) break;
				r = n, o = t.getPartsOpacity(s), o += e / .5, o > 1 && (o = 1)
			}
		}
		r < 0 && (r = 0, o = 1);
		for (var n = 0; n < i.length; n++) {
			var s = i[n].partsIndex;
			if (!(s < 0))
				if (r == n) t.setPartsOpacity(s, o);
				else {
					var a, h = t.getPartsOpacity(s);
					a = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5;
					var l = (1 - a) * (1 - o);
					l > .15 && (a = 1 - .15 / (1 - o)), h > a && (h = a), t.setPartsOpacity(s, h)
				}
		}
	}, $.prototype.copyOpacityOtherParts = function(t, i) {
		for (var e = 0; e < i.length; e++) {
			var r = i[e];
			if (null != r.link && !(r.partsIndex < 0))
				for (var o = t.getPartsOpacity(r.partsIndex), n = 0; n < r.link.length; n++) {
					var s = r.link[n];
					s.partsIndex < 0 || t.setPartsOpacity(s.partsIndex, o)
				}
		}
	}, u.prototype.initIndex = function(t) {
		this.paramIndex = t.getParamIndex("VISIBLE:" + this.id), this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)), t.setParamFloat(this.paramIndex, 1)
	}, p.FRAME_RATE = 30, p.prototype.setPoint = function(t, i) {
		this.faceTargetX = t, this.faceTargetY = i
	}, p.prototype.getX = function() {
		return this.faceX
	}, p.prototype.getY = function() {
		return this.faceY
	}, p.prototype.update = function() {
		var t = 40 / 7.5 / p.FRAME_RATE;
		if (0 == this.lastTimeSec) return void(this.lastTimeSec = UtSystem.getUserTimeMSec());
		var i = UtSystem.getUserTimeMSec(),
			e = (i - this.lastTimeSec) * p.FRAME_RATE / 1e3;
		this.lastTimeSec = i;
		var r = .15 * p.FRAME_RATE,
			o = e * t / r,
			n = this.faceTargetX - this.faceX,
			s = this.faceTargetY - this.faceY;
		if (!(Math.abs(n) <= this.EPSILON && Math.abs(s) <= this.EPSILON)) {
			var _ = Math.sqrt(n * n + s * s),
				a = t * n / _,
				h = t * s / _,
				l = a - this.faceVX,
				$ = h - this.faceVY,
				u = Math.sqrt(l * l + $ * $);
			(u < -o || u > o) && (l *= o / u, $ *= o / u, u = o), this.faceVX += l, this.faceVY += $;
			var f = .5 * (Math.sqrt(o * o + 16 * o * _ - 8 * o * _) - o),
				c = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
			c > f && (this.faceVX *= f / c, this.faceVY *= f / c), this.faceX += this.faceVX, this.faceY += this.faceVY
		}
	}, f.prototype = new _, f.prototype.getMaxScale = function() {
		return this.max
	}, f.prototype.getMinScale = function() {
		return this.min
	}, f.prototype.setMaxScale = function(t) {
		this.max = t
	}, f.prototype.setMinScale = function(t) {
		this.min = t
	}, f.prototype.isMaxScale = function() {
		return this.getScaleX() == this.max
	}, f.prototype.isMinScale = function() {
		return this.getScaleX() == this.min
	}, f.prototype.adjustTranslate = function(t, i) {
		this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]), this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]), this.tr[5] * this.maxTop + (this.tr[13] + i) < this.screenTop && (i = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]), this.tr[5] * this.maxBottom + (this.tr[13] + i) > this.screenBottom && (i = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]);
		var e = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1];
		_.mul(e, this.tr, this.tr)
	}, f.prototype.adjustScale = function(t, i, e) {
		var r = e * this.tr[0];
		r < this.min ? this.tr[0] > 0 && (e = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (e = this.max / this.tr[0]);
		var o = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1],
			n = [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
			s = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -i, 0, 1];
		_.mul(s, this.tr, this.tr), _.mul(n, this.tr, this.tr), _.mul(o, this.tr, this.tr)
	}, f.prototype.setScreenRect = function(t, i, e, r) {
		this.screenLeft = t, this.screenRight = i, this.screenTop = r, this.screenBottom = e
	}, f.prototype.setMaxScreenRect = function(t, i, e, r) {
		this.maxLeft = t, this.maxRight = i, this.maxTop = r, this.maxBottom = e
	}, f.prototype.getScreenLeft = function() {
		return this.screenLeft
	}, f.prototype.getScreenRight = function() {
		return this.screenRight
	}, f.prototype.getScreenBottom = function() {
		return this.screenBottom
	}, f.prototype.getScreenTop = function() {
		return this.screenTop
	}, f.prototype.getMaxLeft = function() {
		return this.maxLeft
	}, f.prototype.getMaxRight = function() {
		return this.maxRight
	}, f.prototype.getMaxBottom = function() {
		return this.maxBottom
	}, f.prototype.getMaxTop = function() {
		return this.maxTop
	}, c.platformManager = null, c.getPlatformManager = function() {
		return c.platformManager
	}, c.setPlatformManager = function(t) {
		c.platformManager = t
	}, t.exports = {
		L2DTargetPoint: p,
		Live2DFramework: c,
		L2DViewMatrix: f,
		L2DPose: $,
		L2DPartsParam: u,
		L2DPhysics: l,
		L2DMotionManager: h,
		L2DModelMatrix: a,
		L2DMatrix44: _,
		EYE_STATE: g,
		L2DEyeBlink: s,
		L2DExpressionParam: n,
		L2DExpressionMotion: o,
		L2DBaseModel: r
	}
}, function(t, i, e) {
	"use strict";
	var r = {
		DEBUG_LOG: !1,
		DEBUG_MOUSE_LOG: !1,
		DEBUG_DRAW_HIT_AREA: !1,
		DEBUG_DRAW_ALPHA_MODEL: !1,
		VIEW_MAX_SCALE: 2,
		VIEW_MIN_SCALE: .8,
		VIEW_LOGICAL_LEFT: -1,
		VIEW_LOGICAL_RIGHT: 1,
		VIEW_LOGICAL_MAX_LEFT: -2,
		VIEW_LOGICAL_MAX_RIGHT: 2,
		VIEW_LOGICAL_MAX_BOTTOM: -2,
		VIEW_LOGICAL_MAX_TOP: 2,
		PRIORITY_NONE: 0,
		PRIORITY_IDLE: 1,
		PRIORITY_SLEEPY: 2,
		PRIORITY_NORMAL: 3,
		PRIORITY_FORCE: 4,
		MOTION_GROUP_IDLE: "idle",
		MOTION_GROUP_SLEEPY: "sleepy",
		MOTION_GROUP_TAP_BODY: "tap_body",
		MOTION_GROUP_FLICK_HEAD: "flick_head",
		MOTION_GROUP_PINCH_IN: "pinch_in",
		MOTION_GROUP_PINCH_OUT: "pinch_out",
		MOTION_GROUP_SHAKE: "shake",
		HIT_AREA_HEAD: "head",
		HIT_AREA_BODY: "body"
	};
	t.exports = r
}, function(t, i, e) {
	"use strict";

	function r(t) {
		n = t
	}

	function o() {
		return n
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.setContext = r, i.getContext = o;
	var n = void 0
}, function(t, i, e) {
	"use strict";

	function r() {}
	r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.depth = 0, r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], r.tmp = new Array(16), r.reset = function() {
		this.depth = 0
	}, r.loadIdentity = function() {
		for (var t = 0; t < 16; t++) this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
	}, r.push = function() {
		var t = (this.depth, 16 * (this.depth + 1));
		this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
		for (var i = 0; i < 16; i++) this.matrixStack[t + i] = this.currentMatrix[i];
		this.depth++
	}, r.pop = function() {
		--this.depth < 0 && (myError("Invalid matrix stack."), this.depth = 0);
		for (var t = 16 * this.depth, i = 0; i < 16; i++) this.currentMatrix[i] = this.matrixStack[t + i]
	}, r.getMatrix = function() {
		return this.currentMatrix
	}, r.multMatrix = function(t) {
		var i, e, r;
		for (i = 0; i < 16; i++) this.tmp[i] = 0;
		for (i = 0; i < 4; i++)
			for (e = 0; e < 4; e++)
				for (r = 0; r < 4; r++) this.tmp[i + 4 * e] += this.currentMatrix[i + 4 * r] * t[r + 4 * e];
		for (i = 0; i < 16; i++) this.currentMatrix[i] = this.tmp[i]
	}, t.exports = r
}, function(t, i, e) {
	t.exports = e(5)
}, function(t, i, e) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}

	function o(t) {
		C = document.getElementById(t), C.addEventListener && (window.addEventListener("click", g), window.addEventListener("mousedown", g), window.addEventListener("mousemove", g), window.addEventListener("mouseup", g), document.addEventListener("mouseout", g), window.addEventListener("touchstart", y), window.addEventListener("touchend", y), window.addEventListener("touchmove", y))
	}

	function n(t) {
		var i = C.width,
			e = C.height;
		N = new M.L2DTargetPoint;
		var r = e / i,
			o = w.default.VIEW_LOGICAL_LEFT,
			n = w.default.VIEW_LOGICAL_RIGHT,
			_ = -r,
			h = r;
		if (window.Live2D.captureFrame = !1, B = new M.L2DViewMatrix, B.setScreenRect(o, n, _, h), B.setMaxScreenRect(w.default.VIEW_LOGICAL_MAX_LEFT, w.default.VIEW_LOGICAL_MAX_RIGHT, w.default.VIEW_LOGICAL_MAX_BOTTOM, w.default.VIEW_LOGICAL_MAX_TOP), B.setMaxScale(w.default.VIEW_MAX_SCALE), B.setMinScale(w.default.VIEW_MIN_SCALE), U = new M.L2DMatrix44, U.multScale(1, i / e), G = new M.L2DMatrix44, G.multTranslate(-i / 2, -e / 2), G.multScale(2 / i, -2 / i), F = v(), (0, D.setContext)(F), !F) return console.error("Failed to create WebGL context."), void(window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
		window.Live2D.setGL(F), F.clearColor(0, 0, 0, 0), a(t), s()
	}

	function s() {
		b || (b = !0, function t() {
			_();
			var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			if (window.Live2D.captureFrame) {
				window.Live2D.captureFrame = !1;
				var e = document.createElement("a");
				document.body.appendChild(e), e.setAttribute("type", "hidden"), e.href = C.toDataURL(), e.download = window.Live2D.captureName || "live2d.png", e.click()
			}
			i(t, C)
		}())
	}

	function _() {
		O.default.reset(), O.default.loadIdentity(), N.update(), R.setDrag(N.getX(), N.getY()), F.clear(F.COLOR_BUFFER_BIT), O.default.multMatrix(U.getArray()), O.default.multMatrix(B.getArray()), O.default.push();
		for (var t = 0; t < R.numModels(); t++) {
			var i = R.getModel(t);
			if (null == i) return;
			i.initialized && !i.updating && (i.update(), i.draw(F))
		}
		O.default.pop()
	}

	function a(t) {
		R.reloadFlg = !0, R.count++, R.changeModel(F, t)
	}

	function h(t, i) {
		return t.x * i.x + t.y * i.y
	}

	function l(t, i) {
		var e = Math.sqrt(t * t + i * i);
		return {
			x: t / e,
			y: i / e
		}
	}

	function $(t, i, e) {
		function r(t, i) {
			return 180 * Math.acos(h({
				x: 0,
				y: 1
			}, l(t, i))) / Math.PI
		}
		if (i.x < e.left + e.width && i.y < e.top + e.height && i.x > e.left && i.y > e.top) return i;
		var o = t.x - i.x,
			n = t.y - i.y,
			s = r(o, n);
		i.x < t.x && (s = 360 - s);
		var _ = 360 - r(e.left - t.x, -1 * (e.top - t.y)),
			a = 360 - r(e.left - t.x, -1 * (e.top + e.height - t.y)),
			$ = r(e.left + e.width - t.x, -1 * (e.top - t.y)),
			u = r(e.left + e.width - t.x, -1 * (e.top + e.height - t.y)),
			p = n / o,
			f = {};
		if (s < $) {
			var c = e.top - t.y,
				d = c / p;
			f = {
				y: t.y + c,
				x: t.x + d
			}
		} else if (s < u) {
			var g = e.left + e.width - t.x,
				y = g * p;
			f = {
				y: t.y + y,
				x: t.x + g
			}
		} else if (s < a) {
			var m = e.top + e.height - t.y,
				T = m / p;
			f = {
				y: t.y + m,
				x: t.x + T
			}
		} else if (s < _) {
			var P = t.x - e.left,
				S = P * p;
			f = {
				y: t.y - S,
				x: t.x - P
			}
		} else {
			var v = e.top - t.y,
				L = v / p;
			f = {
				y: t.y + v,
				x: t.x + L
			}
		}
		return f
	}

	function u(t) {
		Y = !0;
		var i = C.getBoundingClientRect(),
			e = P(t.clientX - i.left),
			r = S(t.clientY - i.top),
			o = $({
				x: i.left + i.width / 2,
				y: i.top + i.height * X
			}, {
				x: t.clientX,
				y: t.clientY
			}, i),
			n = m(o.x - i.left),
			s = T(o.y - i.top);
		w.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), k = e, V = r, N.setPoint(n, s)
	}

	function p(t) {
		Y = !0;
		var i = C.getBoundingClientRect(),
			e = P(t.clientX - i.left),
			r = S(t.clientY - i.top),
			o = $({
				x: i.left + i.width / 2,
				y: i.top + i.height * X
			}, {
				x: t.clientX,
				y: t.clientY
			}, i),
			n = m(o.x - i.left),
			s = T(o.y - i.top);
		w.default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), k = e, V = r, R.tapEvent(n, s)
	}

	function f(t) {
		var i = C.getBoundingClientRect(),
			e = P(t.clientX - i.left),
			r = S(t.clientY - i.top),
			o = $({
				x: i.left + i.width / 2,
				y: i.top + i.height * X
			}, {
				x: t.clientX,
				y: t.clientY
			}, i),
			n = m(o.x - i.left),
			s = T(o.y - i.top);
		w.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + n + " y:" + s + ")"), Y && (k = e, V = r, N.setPoint(n, s))
	}

	function c() {
		Y && (Y = !1), N.setPoint(0, 0)
	}

	function d() {
		w.default.DEBUG_LOG && console.log("Set Session Storage."), sessionStorage.setItem("Sleepy", "1")
	}

	function g(t) {
		if ("mousewheel" == t.type);
		else if ("mousedown" == t.type) p(t);
		else if ("mousemove" == t.type) {
			var i = sessionStorage.getItem("Sleepy");
			"1" === i && sessionStorage.setItem("Sleepy", "0"), u(t)
		} else if ("mouseup" == t.type) {
			if ("button" in t && 0 != t.button) return
		} else if ("mouseout" == t.type) {
			w.default.DEBUG_LOG && console.log("Mouse out Window."), c();
			var e = sessionStorage.getItem("SleepyTimer");
			window.clearTimeout(e), e = window.setTimeout(d, 5e4), sessionStorage.setItem("SleepyTimer", e)
		}
	}

	function y(t) {
		var i = t.touches[0];
		"touchstart" == t.type ? 1 == t.touches.length && u(i) : "touchmove" == t.type ? f(i) : "touchend" == t.type && c()
	}

	function m(t) {
		var i = G.transformX(t);
		return B.invertTransformX(i)
	}

	function T(t) {
		var i = G.transformY(t);
		return B.invertTransformY(i)
	}

	function P(t) {
		return G.transformX(t)
	}

	function S(t) {
		return G.transformY(t)
	}

	function v() {
		for (var t = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], i = 0; i < t.length; i++) try {
			var e = C.getContext(t[i], {
				premultipliedAlpha: !0
			});
			if (e) return e
		} catch (t) {}
		return null
	}

	function L(t, i, e) {
		X = void 0 === e ? .5 : e, o(t), n(i)
	}
	e(6);
	var M = e(0),
		E = e(8),
		A = r(E),
		I = e(1),
		w = r(I),
		x = e(3),
		O = r(x),
		D = e(2),
		R = (window.navigator.platform.toLowerCase(), new A.default),
		b = !1,
		F = null,
		C = null,
		N = null,
		B = null,
		U = null,
		G = null,
		Y = !1,
		k = 0,
		V = 0,
		X = .5;
	window.loadlive2d = L
}, function(t, i, e) {
	"use strict";
	(function(t) {
		! function() {
			function i() {
				At || (this._$MT = null, this._$5S = null, this._$NP = 0, i._$42++, this._$5S = new Y(this))
			}

			function e(t) {
				if (!At) {
					this.clipContextList = new Array, this.glcontext = t.gl, this.dp_webgl = t, this.curFrameNo = 0, this.firstError_clipInNotUpdate = !0, this.colorBuffer = 0, this.isInitGLFBFunc = !1, this.tmpBoundsOnModel = new S, at.glContext.length > at.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()), this.tmpModelToViewMatrix = new R, this.tmpMatrix2 = new R, this.tmpMatrixForMask = new R, this.tmpMatrixForDraw = new R, this.CHANNEL_COLORS = new Array;
					var i = new A;
					i = new A, i.r = 0, i.g = 0, i.b = 0, i.a = 1, this.CHANNEL_COLORS.push(i), i = new A, i.r = 1, i.g = 0, i.b = 0, i.a = 0, this.CHANNEL_COLORS.push(i), i = new A, i.r = 0, i.g = 1, i.b = 0, i.a = 0, this.CHANNEL_COLORS.push(i), i = new A, i.r = 0, i.g = 0, i.b = 1, i.a = 0, this.CHANNEL_COLORS.push(i);
					for (var e = 0; e < this.CHANNEL_COLORS.length; e++) this.dp_webgl.setChannelFlagAsColor(e, this.CHANNEL_COLORS[e])
				}
			}

			function r(t, i, e) {
				this.clipIDList = new Array, this.clipIDList = e, this.clippingMaskDrawIndexList = new Array;
				for (var r = 0; r < e.length; r++) this.clippingMaskDrawIndexList.push(i.getDrawDataIndex(e[r]));
				this.clippedDrawContextList = new Array, this.isUsing = !0, this.layoutChannelNo = 0, this.layoutBounds = new S, this.allClippedDrawRect = new S, this.matrixForMask = new Float32Array(16), this.matrixForDraw = new Float32Array(16), this.owner = t
			}

			function o(t, i) {
				this._$gP = t, this.drawDataIndex = i
			}

			function n() {
				At || (this.color = null)
			}

			function s() {
				At || (this._$dP = null, this._$eo = null, this._$V0 = null, this._$dP = 1e3, this._$eo = 1e3, this._$V0 = 1, this._$a0())
			}

			function _() {}

			function a() {
				this._$r = null, this._$0S = null
			}

			function h() {
				At || (this.x = null, this.y = null, this.width = null, this.height = null)
			}

			function l(t) {
				At || et.prototype.constructor.call(this, t)
			}

			function $() {}

			function u(t) {
				At || et.prototype.constructor.call(this, t)
			}

			function p() {
				At || (this._$vo = null, this._$F2 = null, this._$ao = 400, this._$1S = 400, p._$42++)
			}

			function f() {
				At || (this.p1 = new c, this.p2 = new c, this._$Fo = 0, this._$Db = 0, this._$L2 = 0, this._$M2 = 0, this._$ks = 0, this._$9b = 0, this._$iP = 0, this._$iT = 0, this._$lL = new Array, this._$qP = new Array, this.setup(.3, .5, .1))
			}

			function c() {
				this._$p = 1, this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.ax = 0, this.ay = 0, this.fx = 0, this.fy = 0, this._$s0 = 0, this._$70 = 0, this._$7L = 0, this._$HL = 0
			}

			function d(t, i, e) {
				this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = i, this._$V0 = e
			}

			function g(t, i, e, r) {
				d.prototype.constructor.call(this, i, e, r), this._$tL = null, this._$tL = t
			}

			function y(t, i, e) {
				this._$wL = null, this.scale = null, this._$V0 = null, this._$wL = t, this.scale = i, this._$V0 = e
			}

			function T(t, i, e, r) {
				y.prototype.constructor.call(this, i, e, r), this._$YP = null, this._$YP = t
			}

			function P() {
				At || (this._$fL = 0, this._$gL = 0, this._$B0 = 1, this._$z0 = 1, this._$qT = 0, this.reflectX = !1, this.reflectY = !1)
			}

			function S() {
				At || (this.x = null, this.y = null, this.width = null, this.height = null)
			}

			function v() {}

			function L() {
				At || (this.x = null, this.y = null)
			}

			function M() {
				At || (this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null, this.clipID = null, this.clipIDList = new Array)
			}

			function E() {
				At || (this._$Eb = E._$ps, this._$lT = 1, this._$C0 = 1, this._$tT = 1, this._$WL = 1, this.culling = !1, this.matrix4x4 = new Float32Array(16), this.premultipliedAlpha = !1, this.anisotropy = 0, this.clippingProcess = E.CLIPPING_PROCESS_NONE, this.clipBufPre_clipContextMask = null, this.clipBufPre_clipContextDraw = null, this.CHANNEL_COLORS = new Array)
			}

			function A() {
				At || (this.a = 1, this.r = 1, this.g = 1, this.b = 1, this.scale = 1, this._$ho = 1, this.blendMode = at.L2D_COLOR_BLEND_MODE_MULT)
			}

			function I() {
				At || (this._$kP = null, this._$dr = null, this._$Ai = !0, this._$mS = null)
			}

			function w() {}

			function x() {
				At || (this._$VP = 0, this._$wL = null, this._$GP = null, this._$8o = x._$ds, this._$2r = -1, this._$O2 = 0, this._$ri = 0)
			}

			function O() {}

			function D() {
				At || (this._$Ob = null)
			}

			function R() {
				this.m = new Float32Array(16), this.identity()
			}

			function b(t) {
				At || et.prototype.constructor.call(this, t)
			}

			function F() {
				At || (this._$7 = 1, this._$f = 0, this._$H = 0, this._$g = 1, this._$k = 0, this._$w = 0, this._$hi = STATE_IDENTITY, this._$Z = _$pS)
			}

			function C() {
				At || (s.prototype.constructor.call(this), this.motions = new Array, this._$7r = null, this._$7r = C._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !0, this.loopFadeIn = !0, this._$AS = -1, _$a0())
			}

			function N() {
				this._$P = new Float32Array(100), this.size = 0
			}

			function B() {
				this._$4P = null, this._$I0 = null, this._$RP = null
			}

			function U() {}

			function G() {}

			function Y(t) {
				At || (this._$QT = !0, this._$co = -1, this._$qo = 0, this._$pb = new Array(Y._$is), this._$_2 = new Float32Array(Y._$is), this._$vr = new Float32Array(Y._$is), this._$Rr = new Float32Array(Y._$is), this._$Or = new Float32Array(Y._$is), this._$fs = new Float32Array(Y._$is), this._$Js = new Array(Y._$is), this._$3S = new Array, this._$aS = new Array, this._$Bo = null, this._$F2 = new Array, this._$db = new Array, this._$8b = new Array, this._$Hr = new Array, this._$Ws = null, this._$Vs = null, this._$Er = null, this._$Es = new Int16Array(U._$Qb), this._$ZP = new Float32Array(2 * U._$1r), this._$Ri = t, this._$b0 = Y._$HP++, this.clipManager = null, this.dp_webgl = null)
			}

			function k() {}

			function V() {
				At || (this._$12 = null, this._$bb = null, this._$_L = null, this._$jo = null, this._$iL = null, this._$0L = null, this._$Br = null, this._$Dr = null, this._$Cb = null, this._$mr = null, this._$_L = wt.STATE_FIRST, this._$Br = 4e3, this._$Dr = 100, this._$Cb = 50, this._$mr = 150, this._$jo = !0, this._$iL = "PARAM_EYE_L_OPEN", this._$0L = "PARAM_EYE_R_OPEN")
			}

			function X() {
				At || (E.prototype.constructor.call(this), this._$sb = new Int32Array(X._$As), this._$U2 = new Array, this.transform = null, this.gl = null, null == X._$NT && (X._$NT = X._$9r(256), X._$vS = X._$9r(256), X._$no = X._$vb(256)))
			}

			function z() {
				At || (I.prototype.constructor.call(this), this._$GS = null, this._$Y0 = null)
			}

			function H(t) {
				_t.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Yr = null, this._$Wr = null
			}

			function W() {
				At || (M.prototype.constructor.call(this), this._$gP = null, this._$dr = null, this._$GS = null, this._$qb = null, this._$Lb = null, this._$mS = null)
			}

			function j() {
				At || (this._$NL = null, this._$3S = null, this._$aS = null, j._$42++)
			}

			function q() {
				At || (i.prototype.constructor.call(this), this._$zo = new X)
			}

			function J() {
				At || (s.prototype.constructor.call(this), this.motions = new Array, this._$o2 = null, this._$7r = J._$Co++, this._$D0 = 30, this._$yT = 0, this._$E = !1, this.loopFadeIn = !0, this._$rr = -1, this._$eP = 0)
			}

			function Q(t, i) {
				return String.fromCharCode(t.getUint8(i))
			}

			function N() {
				this._$P = new Float32Array(100), this.size = 0
			}

			function B() {
				this._$4P = null, this._$I0 = null, this._$RP = null
			}

			function Z() {
				At || (I.prototype.constructor.call(this), this._$o = 0, this._$A = 0, this._$GS = null, this._$Eo = null)
			}

			function K(t) {
				_t.prototype.constructor.call(this, t), this._$8r = I._$ur, this._$Cr = null, this._$hr = null
			}

			function tt() {
				At || (this.visible = !0, this._$g0 = !1, this._$NL = null, this._$3S = null, this._$aS = null, tt._$42++)
			}

			function it(t) {
				this._$VS = null, this._$e0 = null, this._$e0 = t
			}

			function et(t) {
				At || (this.id = t)
			}

			function rt() {}

			function ot() {
				At || (this._$4S = null)
			}

			function nt(t, i) {
				this.canvas = t, this.context = i, this.viewport = new Array(0, 0, t.width, t.height), this._$6r = 1, this._$xP = 0, this._$3r = 1, this._$uP = 0, this._$Qo = -1, this.cacheImages = {}
			}

			function st() {
				At || (this._$TT = null, this._$LT = null, this._$FS = null, this._$wL = null)
			}

			function _t(t) {
				At || (this._$e0 = null, this._$IP = null, this._$JS = !1, this._$AT = !0, this._$e0 = t, this.totalScale = 1, this._$7s = 1, this.totalOpacity = 1)
			}

			function at() {}

			function ht() {}

			function lt(t) {
				At || (this._$ib = t)
			}

			function $t() {
				At || (W.prototype.constructor.call(this), this._$LP = -1, this._$d0 = 0, this._$Yo = 0, this._$JP = null, this._$5P = null, this._$BP = null, this._$Eo = null, this._$Qi = null, this._$6s = $t._$ms, this.culling = !0, this.gl_cacheImage = null, this.instanceNo = $t._$42++)
			}

			function ut(t) {
				Mt.prototype.constructor.call(this, t), this._$8r = W._$ur, this._$Cr = null, this._$hr = null
			}

			function pt() {
				At || (this.x = null, this.y = null)
			}

			function ft(t) {
				At || (i.prototype.constructor.call(this), this.drawParamWebGL = new mt(t), this.drawParamWebGL.setGL(at.getGL(t)))
			}

			function ct() {
				At || (this.motions = null, this._$eb = !1, this.motions = new Array)
			}

			function dt() {
				this._$w0 = null, this._$AT = !0, this._$9L = !1, this._$z2 = -1, this._$bs = -1, this._$Do = -1, this._$sr = null, this._$sr = dt._$Gs++
			}

			function gt() {
				this.m = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1)
			}

			function yt(t) {
				At || et.prototype.constructor.call(this, t)
			}

			function mt(t) {
				At || (E.prototype.constructor.call(this), this.textures = new Array, this.transform = null, this.gl = null, this.glno = t, this.firstDraw = !0, this.anisotropyExt = null, this.maxAnisotropy = 0, this._$As = 32, this._$Gr = !1, this._$NT = null, this._$vS = null, this._$no = null, this.vertShader = null, this.fragShader = null, this.vertShaderOff = null, this.fragShaderOff = null)
			}

			function Tt(t, i, e) {
				return null == i && (i = t.createBuffer()), t.bindBuffer(t.ARRAY_BUFFER, i), t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW), i
			}

			function Pt(t, i, e) {
				return null == i && (i = t.createBuffer()), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i), t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.DYNAMIC_DRAW), i
			}

			function St(t) {
				At || (this._$P = new Int8Array(8), this._$R0 = new DataView(this._$P.buffer), this._$3i = new Int8Array(1e3), this._$hL = 0, this._$v0 = 0, this._$S2 = 0, this._$Ko = new Array, this._$T = t, this._$F = 0)
			}

			function vt() {}

			function Lt() {}

			function Mt(t) {
				At || (this._$e0 = null, this._$IP = null, this._$Us = null, this._$7s = null, this._$IS = [!1], this._$VS = null, this._$AT = !0, this.baseOpacity = 1, this.clipBufPre_clipContext = null, this._$e0 = t)
			}

			function Et() {}
			var At = !0;
			i._$0s = 1, i._$4s = 2, i._$42 = 0, i._$62 = function(t, e) {
				try {
					if (e instanceof ArrayBuffer && (e = new DataView(e)), !(e instanceof DataView)) throw new lt("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
					var r, o = new St(e),
						n = o._$ST(),
						s = o._$ST(),
						a = o._$ST();
					if (109 != n || 111 != s || 99 != a) throw new lt("_$gi _$C _$li , _$Q0 _$P0.");
					if (r = o._$ST(), o._$gr(r), r > G._$T7) {
						t._$NP |= i._$4s;
						throw new lt("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + G._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n")
					}
					var h = o._$nP();
					if (r >= G._$s7) {
						var l = o._$9T(),
							$ = o._$9T();
						if (-30584 != l || -30584 != $) throw t._$NP |= i._$0s, new lt("_$gi _$C _$li , _$0 _$6 _$Ui.")
					}
					t._$KS(h);
					var u = t.getModelContext();
					u.setDrawParam(t.getDrawParam()), u.init()
				} catch (t) {
					_._$Rb(t)
				}
			}, i.prototype._$KS = function(t) {
				this._$MT = t
			}, i.prototype.getModelImpl = function() {
				return null == this._$MT && (this._$MT = new p, this._$MT._$zP()), this._$MT
			}, i.prototype.getCanvasWidth = function() {
				return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
			}, i.prototype.getCanvasHeight = function() {
				return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
			}, i.prototype.getParamFloat = function(t) {
				return "number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), this._$5S.getParamFloat(t)
			}, i.prototype.setParamFloat = function(t, i, e) {
				"number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - e) + i * e)
			}, i.prototype.addToParamFloat = function(t, i, e) {
				"number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + i * e)
			}, i.prototype.multParamFloat = function(t, i, e) {
				"number" != typeof t && (t = this._$5S.getParamIndex(u.getID(t))), arguments.length < 3 && (e = 1), this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (i - 1) * e))
			}, i.prototype.getParamIndex = function(t) {
				return this._$5S.getParamIndex(u.getID(t))
			}, i.prototype.loadParam = function() {
				this._$5S.loadParam()
			}, i.prototype.saveParam = function() {
				this._$5S.saveParam()
			}, i.prototype.init = function() {
				this._$5S.init()
			}, i.prototype.update = function() {
				this._$5S.update()
			}, i.prototype._$Rs = function() {
				return _._$li("_$60 _$PT _$Rs()"), -1
			}, i.prototype._$Ds = function(t) {
				_._$li("_$60 _$PT _$SS#_$Ds() \n")
			}, i.prototype._$K2 = function() {}, i.prototype.draw = function() {}, i.prototype.getModelContext = function() {
				return this._$5S
			}, i.prototype._$s2 = function() {
				return this._$NP
			}, i.prototype._$P7 = function(t, i, e, r) {
				var o = -1,
					n = 0,
					s = this;
				if (0 != e)
					if (1 == t.length) {
						var _ = t[0],
							a = 0 != s.getParamFloat(_),
							h = i[0],
							l = s.getPartsOpacity(h),
							$ = e / r;
						a ? (l += $) > 1 && (l = 1) : (l -= $) < 0 && (l = 0), s.setPartsOpacity(h, l)
					} else {
						for (var u = 0; u < t.length; u++) {
							var _ = t[u],
								p = 0 != s.getParamFloat(_);
							if (p) {
								if (o >= 0) break;
								o = u;
								var h = i[u];
								n = s.getPartsOpacity(h), n += e / r, n > 1 && (n = 1)
							}
						}
						o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]), o = 0, n = 1, s.loadParam(), s.setParamFloat(t[o], n), s.saveParam());
						for (var u = 0; u < t.length; u++) {
							var h = i[u];
							if (o == u) s.setPartsOpacity(h, n);
							else {
								var f, c = s.getPartsOpacity(h);
								f = n < .5 ? -.5 * n / .5 + 1 : .5 * (1 - n) / .5;
								var d = (1 - f) * (1 - n);
								d > .15 && (f = 1 - .15 / (1 - n)), c > f && (c = f), s.setPartsOpacity(h, c)
							}
						}
					}
				else
					for (var u = 0; u < t.length; u++) {
						var _ = t[u],
							h = i[u],
							p = 0 != s.getParamFloat(_);
						s.setPartsOpacity(h, p ? 1 : 0)
					}
			}, i.prototype.setPartsOpacity = function(t, i) {
				"number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), this._$5S.setPartsOpacity(t, i)
			}, i.prototype.getPartsDataIndex = function(t) {
				return t instanceof l || (t = l.getID(t)), this._$5S.getPartsDataIndex(t)
			}, i.prototype.getPartsOpacity = function(t) {
				return "number" != typeof t && (t = this._$5S.getPartsDataIndex(l.getID(t))), t < 0 ? 0 : this._$5S.getPartsOpacity(t)
			}, i.prototype.getDrawParam = function() {}, i.prototype.getDrawDataIndex = function(t) {
				return this._$5S.getDrawDataIndex(b.getID(t))
			}, i.prototype.getDrawData = function(t) {
				return this._$5S.getDrawData(t)
			}, i.prototype.getTransformedPoints = function(t) {
				var i = this._$5S._$C2(t);
				return i instanceof ut ? i.getTransformedPoints() : null
			}, i.prototype.getIndexArray = function(t) {
				if (t < 0 || t >= this._$5S._$aS.length) return null;
				var i = this._$5S._$aS[t];
				return null != i && i.getType() == W._$wb && i instanceof $t ? i.getIndexArray() : null
			}, e.CHANNEL_COUNT = 4, e.RENDER_TEXTURE_USE_MIPMAP = !1, e.NOT_USED_FRAME = -100, e.prototype._$L7 = function() {
				if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null), this.tmpMatrix2 && (this.tmpMatrix2 = null), this.tmpMatrixForMask && (this.tmpMatrixForMask = null), this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null), this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null), this.CHANNEL_COLORS) {
					for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t) this.CHANNEL_COLORS.splice(t, 1);
					this.CHANNEL_COLORS = []
				}
				this.releaseShader()
			}, e.prototype.releaseShader = function() {
				for (var t = at.frameBuffers.length, i = 0; i < t; i++) this.gl.deleteFramebuffer(at.frameBuffers[i].framebuffer);
				at.frameBuffers = [], at.glContext = []
			}, e.prototype.init = function(t, i, e) {
				for (var o = 0; o < i.length; o++) {
					var n = i[o].getClipIDList();
					if (null != n) {
						var s = this.findSameClip(n);
						null == s && (s = new r(this, t, n), this.clipContextList.push(s));
						var _ = i[o].getDrawDataID(),
							a = t.getDrawDataIndex(_);
						s.addClippedDrawData(_, a);
						e[o].clipBufPre_clipContext = s
					}
				}
			}, e.prototype.getMaskRenderTexture = function() {
				var t = null;
				return t = this.dp_webgl.createFramebuffer(), at.frameBuffers[this.dp_webgl.glno] = t, this.dp_webgl.glno
			}, e.prototype.setupClip = function(t, i) {
				for (var e = 0, r = 0; r < this.clipContextList.length; r++) {
					var o = this.clipContextList[r];
					this.calcClippedDrawTotalBounds(t, o), o.isUsing && e++
				}
				if (e > 0) {
					var n = i.gl.getParameter(i.gl.FRAMEBUFFER_BINDING),
						s = new Array(4);
					s[0] = 0, s[1] = 0, s[2] = i.gl.canvas.width, s[3] = i.gl.canvas.height, i.gl.viewport(0, 0, at.clippingMaskBufferSize, at.clippingMaskBufferSize), this.setupLayoutBounds(e), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, at.frameBuffers[this.curFrameNo].framebuffer), i.gl.clearColor(0, 0, 0, 0), i.gl.clear(i.gl.COLOR_BUFFER_BIT);
					for (var r = 0; r < this.clipContextList.length; r++) {
						var o = this.clipContextList[r],
							_ = o.allClippedDrawRect,
							a = (o.layoutChannelNo, o.layoutBounds);
						this.tmpBoundsOnModel._$jL(_), this.tmpBoundsOnModel.expand(.05 * _.width, .05 * _.height);
						var h = a.width / this.tmpBoundsOnModel.width,
							l = a.height / this.tmpBoundsOnModel.height;
						this.tmpMatrix2.identity(), this.tmpMatrix2.translate(-1, -1, 0), this.tmpMatrix2.scale(2, 2, 1), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m), this.tmpMatrix2.identity(), this.tmpMatrix2.translate(a.x, a.y, 0), this.tmpMatrix2.scale(h, l, 1), this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0), this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
						for (var $ = this.tmpMatrixForMask.getArray(), u = 0; u < 16; u++) o.matrixForMask[u] = $[u];
						for (var p = this.tmpMatrixForDraw.getArray(), u = 0; u < 16; u++) o.matrixForDraw[u] = p[u];
						for (var f = o.clippingMaskDrawIndexList.length, c = 0; c < f; c++) {
							var d = o.clippingMaskDrawIndexList[c],
								g = t.getDrawData(d),
								y = t._$C2(d);
							i.setClipBufPre_clipContextForMask(o), g.draw(i, t, y)
						}
					}
					i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, n), i.setClipBufPre_clipContextForMask(null), i.gl.viewport(s[0], s[1], s[2], s[3])
				}
			}, e.prototype.getColorBuffer = function() {
				return this.colorBuffer
			}, e.prototype.findSameClip = function(t) {
				for (var i = 0; i < this.clipContextList.length; i++) {
					var e = this.clipContextList[i],
						r = e.clipIDList.length;
					if (r == t.length) {
						for (var o = 0, n = 0; n < r; n++)
							for (var s = e.clipIDList[n], _ = 0; _ < r; _++)
								if (t[_] == s) {
									o++;
									break
								} if (o == r) return e
					}
				}
				return null
			}, e.prototype.calcClippedDrawTotalBounds = function(t, i) {
				for (var e = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = e > r ? e : r, n = o, s = o, _ = 0, a = 0, h = i.clippedDrawContextList.length, l = 0; l < h; l++) {
					var $ = i.clippedDrawContextList[l],
						u = $.drawDataIndex,
						p = t._$C2(u);
					if (p._$yo()) {
						for (var f = p.getTransformedPoints(), c = f.length, d = [], g = [], y = 0, m = U._$i2; m < c; m += U._$No) d[y] = f[m], g[y] = f[m + 1], y++;
						var T = Math.min.apply(null, d),
							P = Math.min.apply(null, g),
							S = Math.max.apply(null, d),
							v = Math.max.apply(null, g);
						T < n && (n = T), P < s && (s = P), S > _ && (_ = S), v > a && (a = v)
					}
				}
				if (n == o) i.allClippedDrawRect.x = 0, i.allClippedDrawRect.y = 0, i.allClippedDrawRect.width = 0, i.allClippedDrawRect.height = 0, i.isUsing = !1;
				else {
					var L = _ - n,
						M = a - s;
					i.allClippedDrawRect.x = n, i.allClippedDrawRect.y = s, i.allClippedDrawRect.width = L, i.allClippedDrawRect.height = M, i.isUsing = !0
				}
			}, e.prototype.setupLayoutBounds = function(t) {
				var i = t / e.CHANNEL_COUNT,
					r = t % e.CHANNEL_COUNT;
				i = ~~i, r = ~~r;
				for (var o = 0, n = 0; n < e.CHANNEL_COUNT; n++) {
					var s = i + (n < r ? 1 : 0);
					if (0 == s);
					else if (1 == s) {
						var a = this.clipContextList[o++];
						a.layoutChannelNo = n, a.layoutBounds.x = 0, a.layoutBounds.y = 0, a.layoutBounds.width = 1, a.layoutBounds.height = 1
					} else if (2 == s)
						for (var h = 0; h < s; h++) {
							var l = h % 2,
								$ = 0;
							l = ~~l;
							var a = this.clipContextList[o++];
							a.layoutChannelNo = n, a.layoutBounds.x = .5 * l, a.layoutBounds.y = 0, a.layoutBounds.width = .5, a.layoutBounds.height = 1
						} else if (s <= 4)
							for (var h = 0; h < s; h++) {
								var l = h % 2,
									$ = h / 2;
								l = ~~l, $ = ~~$;
								var a = this.clipContextList[o++];
								a.layoutChannelNo = n, a.layoutBounds.x = .5 * l, a.layoutBounds.y = .5 * $, a.layoutBounds.width = .5, a.layoutBounds.height = .5
							} else if (s <= 9)
								for (var h = 0; h < s; h++) {
									var l = h % 3,
										$ = h / 3;
									l = ~~l, $ = ~~$;
									var a = this.clipContextList[o++];
									a.layoutChannelNo = n, a.layoutBounds.x = l / 3, a.layoutBounds.y = $ / 3, a.layoutBounds.width = 1 / 3, a.layoutBounds.height = 1 / 3
								} else _._$li("_$6 _$0P mask count : %d", s)
				}
			}, r.prototype.addClippedDrawData = function(t, i) {
				var e = new o(t, i);
				this.clippedDrawContextList.push(e)
			}, s._$JT = function(t, i, e) {
				var r = t / i,
					o = e / i,
					n = o,
					s = 1 - (1 - o) * (1 - o),
					_ = 1 - (1 - n) * (1 - n),
					a = 1 / 3 * (1 - o) * s + (n * (2 / 3) + 1 / 3 * (1 - n)) * (1 - s),
					h = (n + 2 / 3 * (1 - n)) * _ + (o * (1 / 3) + 2 / 3 * (1 - o)) * (1 - _),
					l = 1 - 3 * h + 3 * a - 0,
					$ = 3 * h - 6 * a + 0,
					u = 3 * a - 0;
				if (r <= 0) return 0;
				if (r >= 1) return 1;
				var p = r,
					f = p * p;
				return l * (p * f) + $ * f + u * p + 0
			}, s.prototype._$a0 = function() {}, s.prototype.setFadeIn = function(t) {
				this._$dP = t
			}, s.prototype.setFadeOut = function(t) {
				this._$eo = t
			}, s.prototype._$pT = function(t) {
				this._$V0 = t
			}, s.prototype.getFadeOut = function() {
				return this._$eo
			}, s.prototype._$4T = function() {
				return this._$eo
			}, s.prototype._$mT = function() {
				return this._$V0
			}, s.prototype.getDurationMSec = function() {
				return -1
			}, s.prototype.getLoopDurationMSec = function() {
				return -1
			}, s.prototype.updateParam = function(t, i) {
				if (i._$AT && !i._$9L) {
					var e = w.getUserTimeMSec();
					if (i._$z2 < 0) {
						i._$z2 = e, i._$bs = e;
						var r = this.getDurationMSec();
						i._$Do < 0 && (i._$Do = r <= 0 ? -1 : i._$z2 + r)
					}
					var o = this._$V0;
					o = o * (0 == this._$dP ? 1 : ht._$r2((e - i._$bs) / this._$dP)) * (0 == this._$eo || i._$Do < 0 ? 1 : ht._$r2((i._$Do - e) / this._$eo)), 0 <= o && o <= 1 || console.log("### assert!! ### "), this.updateParamExe(t, e, o, i), i._$Do > 0 && i._$Do < e && (i._$9L = !0)
				}
			}, s.prototype.updateParamExe = function(t, i, e, r) {}, _._$8s = 0, _._$fT = new Object, _.start = function(t) {
				var i = _._$fT[t];
				null == i && (i = new a, i._$r = t, _._$fT[t] = i), i._$0S = w.getSystemTimeMSec()
			}, _.dump = function(t) {
				var i = _._$fT[t];
				if (null != i) {
					var e = w.getSystemTimeMSec(),
						r = e - i._$0S;
					return console.log(t + " : " + r + "ms"), r
				}
				return -1
			}, _.end = function(t) {
				var i = _._$fT[t];
				if (null != i) {
					return w.getSystemTimeMSec() - i._$0S
				}
				return -1
			}, _._$li = function(t, i) {
				console.log("_$li : " + t + "\n", i)
			}, _._$Ji = function(t, i) {
				console.log(t, i)
			}, _._$dL = function(t, i) {
				console.log(t, i), console.log("\n")
			}, _._$KL = function(t, i) {
				for (var e = 0; e < i; e++) e % 16 == 0 && e > 0 ? console.log("\n") : e % 8 == 0 && e > 0 && console.log("  "), console.log("%02X ", 255 & t[e]);
				console.log("\n")
			}, _._$nr = function(t, i, e) {
				console.log("%s\n", t);
				for (var r = i.length, o = 0; o < r; ++o) console.log("%5d", i[o]), console.log("%s\n", e), console.log(",");
				console.log("\n")
			}, _._$Rb = function(t) {
				console.log("dump exception : " + t), console.log("stack :: " + t.stack)
			}, h.prototype._$8P = function() {
				return .5 * (this.x + this.x + this.width)
			}, h.prototype._$6P = function() {
				return .5 * (this.y + this.y + this.height)
			}, h.prototype._$EL = function() {
				return this.x + this.width
			}, h.prototype._$5T = function() {
				return this.y + this.height
			}, h.prototype._$jL = function(t, i, e, r) {
				this.x = t, this.y = i, this.width = e, this.height = r
			}, h.prototype._$jL = function(t) {
				this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
			}, l.prototype = new et, l._$tP = new Object, l._$27 = function() {
				l._$tP.clear()
			}, l.getID = function(t) {
				var i = l._$tP[t];
				return null == i && (i = new l(t), l._$tP[t] = i), i
			}, l.prototype._$3s = function() {
				return new l
			}, u.prototype = new et, u._$tP = new Object, u._$27 = function() {
				u._$tP.clear()
			}, u.getID = function(t) {
				var i = u._$tP[t];
				return null == i && (i = new u(t), u._$tP[t] = i), i
			}, u.prototype._$3s = function() {
				return new u
			}, p._$42 = 0, p.prototype._$zP = function() {
				null == this._$vo && (this._$vo = new ot), null == this._$F2 && (this._$F2 = new Array)
			}, p.prototype.getCanvasWidth = function() {
				return this._$ao
			}, p.prototype.getCanvasHeight = function() {
				return this._$1S
			}, p.prototype._$F0 = function(t) {
				this._$vo = t._$nP(), this._$F2 = t._$nP(), this._$ao = t._$6L(), this._$1S = t._$6L()
			}, p.prototype._$6S = function(t) {
				this._$F2.push(t)
			}, p.prototype._$Xr = function() {
				return this._$F2
			}, p.prototype._$E2 = function() {
				return this._$vo
			}, f.prototype.setup = function(t, i, e) {
				this._$ks = this._$Yb(), this.p2._$xT(), 3 == arguments.length && (this._$Fo = t, this._$L2 = i, this.p1._$p = e, this.p2._$p = e, this.p2.y = t, this.setup())
			}, f.prototype.getPhysicsPoint1 = function() {
				return this.p1
			}, f.prototype.getPhysicsPoint2 = function() {
				return this.p2
			}, f.prototype._$qr = function() {
				return this._$Db
			}, f.prototype._$pr = function(t) {
				this._$Db = t
			}, f.prototype._$5r = function() {
				return this._$M2
			}, f.prototype._$Cs = function() {
				return this._$9b
			}, f.prototype._$Yb = function() {
				return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
			}, f.prototype.addSrcParam = function(t, i, e, r) {
				var o = new g(t, i, e, r);
				this._$lL.push(o)
			}, f.prototype.addTargetParam = function(t, i, e, r) {
				var o = new T(t, i, e, r);
				this._$qP.push(o)
			}, f.prototype.update = function(t, i) {
				if (0 == this._$iP) return this._$iP = this._$iT = i, void(this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
				var e = (i - this._$iT) / 1e3;
				if (0 != e) {
					for (var r = this._$lL.length - 1; r >= 0; --r) {
						this._$lL[r]._$oP(t, this)
					}
					this._$oo(t, e), this._$M2 = this._$Yb(), this._$9b = (this._$M2 - this._$ks) / e, this._$ks = this._$M2
				}
				for (var r = this._$qP.length - 1; r >= 0; --r) {
					this._$qP[r]._$YS(t, this)
				}
				this._$iT = i
			}, f.prototype._$oo = function(t, i) {
				i < .033 && (i = .033);
				var e = 1 / i;
				this.p1.vx = (this.p1.x - this.p1._$s0) * e, this.p1.vy = (this.p1.y - this.p1._$70) * e, this.p1.ax = (this.p1.vx - this.p1._$7L) * e, this.p1.ay = (this.p1.vy - this.p1._$HL) * e, this.p1.fx = this.p1.ax * this.p1._$p, this.p1.fy = this.p1.ay * this.p1._$p, this.p1._$xT();
				var r, o, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x),
					s = Math.cos(n),
					_ = Math.sin(n),
					a = 9.8 * this.p2._$p,
					h = this._$Db * Lt._$bS,
					l = a * Math.cos(n - h);
				r = l * _, o = l * s;
				var $ = -this.p1.fx * _ * _,
					u = -this.p1.fy * _ * s,
					p = -this.p2.vx * this._$L2,
					f = -this.p2.vy * this._$L2;
				this.p2.fx = r + $ + p, this.p2.fy = o + u + f, this.p2.ax = this.p2.fx / this.p2._$p, this.p2.ay = this.p2.fy / this.p2._$p, this.p2.vx += this.p2.ax * i, this.p2.vy += this.p2.ay * i, this.p2.x += this.p2.vx * i, this.p2.y += this.p2.vy * i;
				var c = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
				this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / c, this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / c, this.p2.vx = (this.p2.x - this.p2._$s0) * e, this.p2.vy = (this.p2.y - this.p2._$70) * e, this.p2._$xT()
			}, c.prototype._$xT = function() {
				this._$s0 = this.x, this._$70 = this.y, this._$7L = this.vx, this._$HL = this.vy
			}, d.prototype._$oP = function(t, i) {}, g.prototype = new d, g.prototype._$oP = function(t, i) {
				var e = this.scale * t.getParamFloat(this._$wL),
					r = i.getPhysicsPoint1();
				switch (this._$tL) {
					default:
					case f.Src.SRC_TO_X:
						r.x = r.x + (e - r.x) * this._$V0;
						break;
					case f.Src.SRC_TO_Y:
						r.y = r.y + (e - r.y) * this._$V0;
						break;
					case f.Src.SRC_TO_G_ANGLE:
						var o = i._$qr();
						o += (e - o) * this._$V0, i._$pr(o)
				}
			}, y.prototype._$YS = function(t, i) {}, T.prototype = new y, T.prototype._$YS = function(t, i) {
				switch (this._$YP) {
					default:
					case f.Target.TARGET_FROM_ANGLE:
						t.setParamFloat(this._$wL, this.scale * i._$5r(), this._$V0);
						break;
					case f.Target.TARGET_FROM_ANGLE_V:
						t.setParamFloat(this._$wL, this.scale * i._$Cs(), this._$V0)
				}
			}, f.Src = function() {}, f.Src.SRC_TO_X = "SRC_TO_X", f.Src.SRC_TO_Y = "SRC_TO_Y", f.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE", f.Target = function() {}, f.Target.TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE", f.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V", P.prototype.init = function(t) {
				this._$fL = t._$fL, this._$gL = t._$gL, this._$B0 = t._$B0, this._$z0 = t._$z0, this._$qT = t._$qT, this.reflectX = t.reflectX, this.reflectY = t.reflectY
			}, P.prototype._$F0 = function(t) {
				this._$fL = t._$_T(), this._$gL = t._$_T(), this._$B0 = t._$_T(), this._$z0 = t._$_T(), this._$qT = t._$_T(), t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(), this.reflectY = t._$po())
			}, P.prototype._$e = function() {};
			var It = function() {};
			It._$ni = function(t, i, e, r, o, n, s, _, a) {
				var h = s * n - _ * o;
				if (0 == h) return null;
				var l, $ = ((t - e) * n - (i - r) * o) / h;
				return l = 0 != o ? (t - e - $ * s) / o : (i - r - $ * _) / n, isNaN(l) && (l = (t - e - $ * s) / o, isNaN(l) && (l = (i - r - $ * _) / n), isNaN(l) && (console.log("a is NaN @UtVector#_$ni() "), console.log("v1x : " + o), console.log("v1x != 0 ? " + (0 != o)))), null == a ? new Array(l, $) : (a[0] = l, a[1] = $, a)
			}, S.prototype._$8P = function() {
				return this.x + .5 * this.width
			}, S.prototype._$6P = function() {
				return this.y + .5 * this.height
			}, S.prototype._$EL = function() {
				return this.x + this.width
			}, S.prototype._$5T = function() {
				return this.y + this.height
			}, S.prototype._$jL = function(t, i, e, r) {
				this.x = t, this.y = i, this.width = e, this.height = r
			}, S.prototype._$jL = function(t) {
				this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
			}, S.prototype.contains = function(t, i) {
				return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height
			}, S.prototype.expand = function(t, i) {
				this.x -= t, this.y -= i, this.width += 2 * t, this.height += 2 * i
			}, v._$Z2 = function(t, i, e, r) {
				var o = i._$Q2(t, e),
					n = t._$vs(),
					s = t._$Tr();
				if (i._$zr(n, s, o), o <= 0) return r[n[0]];
				if (1 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						h = s[0];
					return _ + (a - _) * h | 0
				}
				if (2 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						l = r[n[2]],
						$ = r[n[3]],
						h = s[0],
						u = s[1],
						p = _ + (a - _) * h | 0,
						f = l + ($ - l) * h | 0;
					return p + (f - p) * u | 0
				}
				if (3 == o) {
					var c = r[n[0]],
						d = r[n[1]],
						g = r[n[2]],
						y = r[n[3]],
						m = r[n[4]],
						T = r[n[5]],
						P = r[n[6]],
						S = r[n[7]],
						h = s[0],
						u = s[1],
						v = s[2],
						_ = c + (d - c) * h | 0,
						a = g + (y - g) * h | 0,
						l = m + (T - m) * h | 0,
						$ = P + (S - P) * h | 0,
						p = _ + (a - _) * u | 0,
						f = l + ($ - l) * u | 0;
					return p + (f - p) * v | 0
				}
				if (4 == o) {
					var L = r[n[0]],
						M = r[n[1]],
						E = r[n[2]],
						A = r[n[3]],
						I = r[n[4]],
						w = r[n[5]],
						x = r[n[6]],
						O = r[n[7]],
						D = r[n[8]],
						R = r[n[9]],
						b = r[n[10]],
						F = r[n[11]],
						C = r[n[12]],
						N = r[n[13]],
						B = r[n[14]],
						U = r[n[15]],
						h = s[0],
						u = s[1],
						v = s[2],
						G = s[3],
						c = L + (M - L) * h | 0,
						d = E + (A - E) * h | 0,
						g = I + (w - I) * h | 0,
						y = x + (O - x) * h | 0,
						m = D + (R - D) * h | 0,
						T = b + (F - b) * h | 0,
						P = C + (N - C) * h | 0,
						S = B + (U - B) * h | 0,
						_ = c + (d - c) * u | 0,
						a = g + (y - g) * u | 0,
						l = m + (T - m) * u | 0,
						$ = P + (S - P) * u | 0,
						p = _ + (a - _) * v | 0,
						f = l + ($ - l) * v | 0;
					return p + (f - p) * G | 0
				}
				for (var Y = 1 << o, k = new Float32Array(Y), V = 0; V < Y; V++) {
					for (var X = V, z = 1, H = 0; H < o; H++) z *= X % 2 == 0 ? 1 - s[H] : s[H], X /= 2;
					k[V] = z
				}
				for (var W = new Float32Array(Y), j = 0; j < Y; j++) W[j] = r[n[j]];
				for (var q = 0, j = 0; j < Y; j++) q += k[j] * W[j];
				return q + .5 | 0
			}, v._$br = function(t, i, e, r) {
				var o = i._$Q2(t, e),
					n = t._$vs(),
					s = t._$Tr();
				if (i._$zr(n, s, o), o <= 0) return r[n[0]];
				if (1 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						h = s[0];
					return _ + (a - _) * h
				}
				if (2 == o) {
					var _ = r[n[0]],
						a = r[n[1]],
						l = r[n[2]],
						$ = r[n[3]],
						h = s[0],
						u = s[1];
					return (1 - u) * (_ + (a - _) * h) + u * (l + ($ - l) * h)
				}
				if (3 == o) {
					var p = r[n[0]],
						f = r[n[1]],
						c = r[n[2]],
						d = r[n[3]],
						g = r[n[4]],
						y = r[n[5]],
						m = r[n[6]],
						T = r[n[7]],
						h = s[0],
						u = s[1],
						P = s[2];
					return (1 - P) * ((1 - u) * (p + (f - p) * h) + u * (c + (d - c) * h)) + P * ((1 - u) * (g + (y - g) * h) + u * (m + (T - m) * h))
				}
				if (4 == o) {
					var S = r[n[0]],
						v = r[n[1]],
						L = r[n[2]],
						M = r[n[3]],
						E = r[n[4]],
						A = r[n[5]],
						I = r[n[6]],
						w = r[n[7]],
						x = r[n[8]],
						O = r[n[9]],
						D = r[n[10]],
						R = r[n[11]],
						b = r[n[12]],
						F = r[n[13]],
						C = r[n[14]],
						N = r[n[15]],
						h = s[0],
						u = s[1],
						P = s[2],
						B = s[3];
					return (1 - B) * ((1 - P) * ((1 - u) * (S + (v - S) * h) + u * (L + (M - L) * h)) + P * ((1 - u) * (E + (A - E) * h) + u * (I + (w - I) * h))) + B * ((1 - P) * ((1 - u) * (x + (O - x) * h) + u * (D + (R - D) * h)) + P * ((1 - u) * (b + (F - b) * h) + u * (C + (N - C) * h)))
				}
				for (var U = 1 << o, G = new Float32Array(U), Y = 0; Y < U; Y++) {
					for (var k = Y, V = 1, X = 0; X < o; X++) V *= k % 2 == 0 ? 1 - s[X] : s[X], k /= 2;
					G[Y] = V
				}
				for (var z = new Float32Array(U), H = 0; H < U; H++) z[H] = r[n[H]];
				for (var W = 0, H = 0; H < U; H++) W += G[H] * z[H];
				return W
			}, v._$Vr = function(t, i, e, r, o, n, s, _) {
				var a = i._$Q2(t, e),
					h = t._$vs(),
					l = t._$Tr();
				i._$zr(h, l, a);
				var $ = 2 * r,
					u = s;
				if (a <= 0) {
					var p = h[0],
						f = o[p];
					if (2 == _ && 0 == s) w._$jT(f, 0, n, 0, $);
					else
						for (var c = 0; c < $;) n[u] = f[c++], n[u + 1] = f[c++], u += _
				} else if (1 == a)
					for (var f = o[h[0]], d = o[h[1]], g = l[0], y = 1 - g, c = 0; c < $;) n[u] = f[c] * y + d[c] * g, ++c, n[u + 1] = f[c] * y + d[c] * g, ++c, u += _;
				else if (2 == a)
					for (var f = o[h[0]], d = o[h[1]], m = o[h[2]], T = o[h[3]], g = l[0], P = l[1], y = 1 - g, S = 1 - P, v = S * y, L = S * g, M = P * y, E = P * g, c = 0; c < $;) n[u] = v * f[c] + L * d[c] + M * m[c] + E * T[c], ++c, n[u + 1] = v * f[c] + L * d[c] + M * m[c] + E * T[c], ++c, u += _;
				else if (3 == a)
					for (var A = o[h[0]], I = o[h[1]], x = o[h[2]], O = o[h[3]], D = o[h[4]], R = o[h[5]], b = o[h[6]], F = o[h[7]], g = l[0], P = l[1], C = l[2], y = 1 - g, S = 1 - P, N = 1 - C, B = N * S * y, U = N * S * g, G = N * P * y, Y = N * P * g, k = C * S * y, V = C * S * g, X = C * P * y, z = C * P * g, c = 0; c < $;) n[u] = B * A[c] + U * I[c] + G * x[c] + Y * O[c] + k * D[c] + V * R[c] + X * b[c] + z * F[c], ++c, n[u + 1] = B * A[c] + U * I[c] + G * x[c] + Y * O[c] + k * D[c] + V * R[c] + X * b[c] + z * F[c], ++c, u += _;
				else if (4 == a)
					for (var H = o[h[0]], W = o[h[1]], j = o[h[2]], q = o[h[3]], J = o[h[4]], Q = o[h[5]], Z = o[h[6]], K = o[h[7]], tt = o[h[8]], it = o[h[9]], et = o[h[10]], rt = o[h[11]], ot = o[h[12]], nt = o[h[13]], st = o[h[14]], _t = o[h[15]], g = l[0], P = l[1], C = l[2], at = l[3], y = 1 - g, S = 1 - P, N = 1 - C, ht = 1 - at, lt = ht * N * S * y, $t = ht * N * S * g, ut = ht * N * P * y, pt = ht * N * P * g, ft = ht * C * S * y, ct = ht * C * S * g, dt = ht * C * P * y, gt = ht * C * P * g, yt = at * N * S * y, mt = at * N * S * g, Tt = at * N * P * y, Pt = at * N * P * g, St = at * C * S * y, vt = at * C * S * g, Lt = at * C * P * y, Mt = at * C * P * g, c = 0; c < $;) n[u] = lt * H[c] + $t * W[c] + ut * j[c] + pt * q[c] + ft * J[c] + ct * Q[c] + dt * Z[c] + gt * K[c] + yt * tt[c] + mt * it[c] + Tt * et[c] + Pt * rt[c] + St * ot[c] + vt * nt[c] + Lt * st[c] + Mt * _t[c], ++c, n[u + 1] = lt * H[c] + $t * W[c] + ut * j[c] + pt * q[c] + ft * J[c] + ct * Q[c] + dt * Z[c] + gt * K[c] + yt * tt[c] + mt * it[c] + Tt * et[c] + Pt * rt[c] + St * ot[c] + vt * nt[c] + Lt * st[c] + Mt * _t[c], ++c, u += _;
				else {
					for (var Et = 1 << a, At = new Float32Array(Et), It = 0; It < Et; It++) {
						for (var wt = It, xt = 1, Ot = 0; Ot < a; Ot++) xt *= wt % 2 == 0 ? 1 - l[Ot] : l[Ot], wt /= 2;
						At[It] = xt
					}
					for (var Dt = new Float32Array(Et), Rt = 0; Rt < Et; Rt++) Dt[Rt] = o[h[Rt]];
					for (var c = 0; c < $;) {
						for (var bt = 0, Ft = 0, Ct = c + 1, Rt = 0; Rt < Et; Rt++) bt += At[Rt] * Dt[Rt][c], Ft += At[Rt] * Dt[Rt][Ct];
						c += 2, n[u] = bt, n[u + 1] = Ft, u += _
					}
				}
			}, L.prototype._$HT = function(t, i) {
				this.x = t, this.y = i
			}, L.prototype._$HT = function(t) {
				this.x = t.x, this.y = t.y
			}, M._$ur = -2, M._$ES = 500, M._$wb = 2, M._$8S = 3, M._$52 = M._$ES, M._$R2 = M._$ES, M._$or = function() {
				return M._$52
			}, M._$Pr = function() {
				return M._$R2
			}, M.prototype.convertClipIDForV2_11 = function(t) {
				var i = [];
				return null == t ? null : 0 == t.length ? null : /,/.test(t) ? i = t.id.split(",") : (i.push(t.id), i)
			}, M.prototype._$F0 = function(t) {
				this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [], this._$MS(this._$Lb)
			}, M.prototype.getClipIDList = function() {
				return this.clipIDList
			}, M.prototype.init = function(t) {}, M.prototype._$Nr = function(t, i) {
				if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
				else if (i._$IS[0]) return;
				i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
			}, M.prototype._$2b = function(t, i) {}, M.prototype.getDrawDataID = function() {
				return this._$gP
			}, M.prototype._$j2 = function(t) {
				this._$gP = t
			}, M.prototype.getOpacity = function(t, i) {
				return i._$7s
			}, M.prototype._$zS = function(t, i) {
				return i._$Us
			}, M.prototype._$MS = function(t) {
				for (var i = t.length - 1; i >= 0; --i) {
					var e = t[i];
					e < M._$52 ? M._$52 = e : e > M._$R2 && (M._$R2 = e)
				}
			}, M.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, M.prototype._$gs = function(t) {
				this._$dr = t
			}, M.prototype._$32 = function() {
				return null != this._$dr && this._$dr != yt._$2o()
			}, M.prototype.preDraw = function(t, i, e) {}, M.prototype.draw = function(t, i, e) {}, M.prototype.getType = function() {}, M.prototype._$B2 = function(t, i, e) {}, E._$ps = 32, E.CLIPPING_PROCESS_NONE = 0, E.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1, E.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2, E.CLIPPING_PROCESS_DRAW = 3, E.CLIPPING_PROCESS_CLEAR_ALPHA = 4, E.prototype.setChannelFlagAsColor = function(t, i) {
				this.CHANNEL_COLORS[t] = i
			}, E.prototype.getChannelFlagAsColor = function(t) {
				return this.CHANNEL_COLORS[t]
			}, E.prototype._$ZT = function() {}, E.prototype._$Uo = function(t, i, e, r, o, n, s) {}, E.prototype._$Rs = function() {
				return -1
			}, E.prototype._$Ds = function(t) {}, E.prototype.setBaseColor = function(t, i, e, r) {
				t < 0 ? t = 0 : t > 1 && (t = 1), i < 0 ? i = 0 : i > 1 && (i = 1), e < 0 ? e = 0 : e > 1 && (e = 1), r < 0 ? r = 0 : r > 1 && (r = 1), this._$lT = t, this._$C0 = i, this._$tT = e, this._$WL = r
			}, E.prototype._$WP = function(t) {
				this.culling = t
			}, E.prototype.setMatrix = function(t) {
				for (var i = 0; i < 16; i++) this.matrix4x4[i] = t[i]
			}, E.prototype._$IT = function() {
				return this.matrix4x4
			}, E.prototype.setPremultipliedAlpha = function(t) {
				this.premultipliedAlpha = t
			}, E.prototype.isPremultipliedAlpha = function() {
				return this.premultipliedAlpha
			}, E.prototype.setAnisotropy = function(t) {
				this.anisotropy = t
			}, E.prototype.getAnisotropy = function() {
				return this.anisotropy
			}, E.prototype.getClippingProcess = function() {
				return this.clippingProcess
			}, E.prototype.setClippingProcess = function(t) {
				this.clippingProcess = t
			}, E.prototype.setClipBufPre_clipContextForMask = function(t) {
				this.clipBufPre_clipContextMask = t
			}, E.prototype.getClipBufPre_clipContextMask = function() {
				return this.clipBufPre_clipContextMask
			}, E.prototype.setClipBufPre_clipContextForDraw = function(t) {
				this.clipBufPre_clipContextDraw = t
			}, E.prototype.getClipBufPre_clipContextDraw = function() {
				return this.clipBufPre_clipContextDraw
			}, I._$ur = -2, I._$c2 = 1, I._$_b = 2, I.prototype._$F0 = function(t) {
				this._$kP = t._$nP(), this._$dr = t._$nP()
			}, I.prototype.readV2_opacity = function(t) {
				t.getFormatVersion() >= G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
			}, I.prototype.init = function(t) {}, I.prototype._$Nr = function(t, i) {}, I.prototype.interpolateOpacity = function(t, i, e, r) {
				null == this._$mS ? e.setInterpolatedOpacity(1) : e.setInterpolatedOpacity(v._$br(t, i, r, this._$mS))
			}, I.prototype._$2b = function(t, i) {}, I.prototype._$nb = function(t, i, e, r, o, n, s) {}, I.prototype.getType = function() {}, I.prototype._$gs = function(t) {
				this._$dr = t
			}, I.prototype._$a2 = function(t) {
				this._$kP = t
			}, I.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, I.prototype.getBaseDataID = function() {
				return this._$kP
			}, I.prototype._$32 = function() {
				return null != this._$dr && this._$dr != yt._$2o()
			}, w._$W2 = 0, w._$CS = w._$W2, w._$Mo = function() {
				return !0
			}, w._$XP = function(t) {
				try {
					for (var i = getTimeMSec(); getTimeMSec() - i < t;);
				} catch (t) {
					t._$Rb()
				}
			}, w.getUserTimeMSec = function() {
				return w._$CS == w._$W2 ? w.getSystemTimeMSec() : w._$CS
			}, w.setUserTimeMSec = function(t) {
				w._$CS = t
			}, w.updateUserTimeMSec = function() {
				return w._$CS = w.getSystemTimeMSec()
			}, w.getTimeMSec = function() {
				return (new Date).getTime()
			}, w.getSystemTimeMSec = function() {
				return (new Date).getTime()
			}, w._$Q = function(t) {}, w._$jT = function(t, i, e, r, o) {
				for (var n = 0; n < o; n++) e[r + n] = t[i + n]
			}, x._$ds = -2, x.prototype._$F0 = function(t) {
				this._$wL = t._$nP(), this._$VP = t._$6L(), this._$GP = t._$nP()
			}, x.prototype.getParamIndex = function(t) {
				return this._$2r != t && (this._$8o = x._$ds), this._$8o
			}, x.prototype._$Pb = function(t, i) {
				this._$8o = t, this._$2r = i
			}, x.prototype.getParamID = function() {
				return this._$wL
			}, x.prototype._$yP = function(t) {
				this._$wL = t
			}, x.prototype._$N2 = function() {
				return this._$VP
			}, x.prototype._$d2 = function() {
				return this._$GP
			}, x.prototype._$t2 = function(t, i) {
				this._$VP = t, this._$GP = i
			}, x.prototype._$Lr = function() {
				return this._$O2
			}, x.prototype._$wr = function(t) {
				this._$O2 = t
			}, x.prototype._$SL = function() {
				return this._$ri
			}, x.prototype._$AL = function(t) {
				this._$ri = t
			}, O.startsWith = function(t, i, e) {
				var r = i + e.length;
				if (r >= t.length) return !1;
				for (var o = i; o < r; o++)
					if (O.getChar(t, o) != e.charAt(o - i)) return !1;
				return !0
			}, O.getChar = function(t, i) {
				return String.fromCharCode(t.getUint8(i))
			}, O.createString = function(t, i, e) {
				for (var r = new ArrayBuffer(2 * e), o = new Uint16Array(r), n = 0; n < e; n++) o[n] = t.getUint8(i + n);
				return String.fromCharCode.apply(null, o)
			}, O._$LS = function(t, i, e, r) {
				t instanceof ArrayBuffer && (t = new DataView(t));
				var o = e,
					n = !1,
					s = !1,
					_ = 0,
					a = O.getChar(t, o);
				"-" == a && (n = !0, o++);
				for (var h = !1; o < i; o++) {
					switch (a = O.getChar(t, o)) {
						case "0":
							_ *= 10;
							break;
						case "1":
							_ = 10 * _ + 1;
							break;
						case "2":
							_ = 10 * _ + 2;
							break;
						case "3":
							_ = 10 * _ + 3;
							break;
						case "4":
							_ = 10 * _ + 4;
							break;
						case "5":
							_ = 10 * _ + 5;
							break;
						case "6":
							_ = 10 * _ + 6;
							break;
						case "7":
							_ = 10 * _ + 7;
							break;
						case "8":
							_ = 10 * _ + 8;
							break;
						case "9":
							_ = 10 * _ + 9;
							break;
						case ".":
							s = !0, o++, h = !0;
							break;
						default:
							h = !0
					}
					if (h) break
				}
				if (s)
					for (var l = .1, $ = !1; o < i; o++) {
						switch (a = O.getChar(t, o)) {
							case "0":
								break;
							case "1":
								_ += 1 * l;
								break;
							case "2":
								_ += 2 * l;
								break;
							case "3":
								_ += 3 * l;
								break;
							case "4":
								_ += 4 * l;
								break;
							case "5":
								_ += 5 * l;
								break;
							case "6":
								_ += 6 * l;
								break;
							case "7":
								_ += 7 * l;
								break;
							case "8":
								_ += 8 * l;
								break;
							case "9":
								_ += 9 * l;
								break;
							default:
								$ = !0
						}
						if (l *= .1, $) break
					}
				return n && (_ = -_), r[0] = o, _
			}, D.prototype._$zP = function() {
				this._$Ob = new Array
			}, D.prototype._$F0 = function(t) {
				this._$Ob = t._$nP()
			}, D.prototype._$Ur = function(t) {
				if (t._$WS()) return !0;
				for (var i = t._$v2(), e = this._$Ob.length - 1; e >= 0; --e) {
					var r = this._$Ob[e].getParamIndex(i);
					if (r == x._$ds && (r = t.getParamIndex(this._$Ob[e].getParamID())), t._$Xb(r)) return !0
				}
				return !1
			}, D.prototype._$Q2 = function(t, i) {
				for (var e, r, o = this._$Ob.length, n = t._$v2(), s = 0, _ = 0; _ < o; _++) {
					var a = this._$Ob[_];
					if (e = a.getParamIndex(n), e == x._$ds && (e = t.getParamIndex(a.getParamID()), a._$Pb(e, n)), e < 0) throw new Exception("err 23242 : " + a.getParamID());
					var h = e < 0 ? 0 : t.getParamFloat(e);
					r = a._$N2();
					var l, $, u = a._$d2(),
						p = -1,
						f = 0;
					if (r < 1);
					else if (1 == r) l = u[0], l - U._$J < h && h < l + U._$J ? (p = 0, f = 0) : (p = 0, i[0] = !0);
					else if (l = u[0], h < l - U._$J) p = 0, i[0] = !0;
					else if (h < l + U._$J) p = 0;
					else {
						for (var c = !1, d = 1; d < r; ++d) {
							if ($ = u[d], h < $ + U._$J) {
								$ - U._$J < h ? p = d : (p = d - 1, f = (h - l) / ($ - l), s++), c = !0;
								break
							}
							l = $
						}
						c || (p = r - 1, f = 0, i[0] = !0)
					}
					a._$wr(p), a._$AL(f)
				}
				return s
			}, D.prototype._$zr = function(t, i, e) {
				var r = 1 << e;
				r + 1 > U._$Qb && console.log("err 23245\n");
				for (var o = this._$Ob.length, n = 1, s = 1, _ = 0, a = 0; a < r; ++a) t[a] = 0;
				for (var h = 0; h < o; ++h) {
					var l = this._$Ob[h];
					if (0 == l._$SL()) {
						var $ = l._$Lr() * n;
						if ($ < 0 && at._$3T) throw new Exception("err 23246");
						for (var a = 0; a < r; ++a) t[a] += $
					} else {
						for (var $ = n * l._$Lr(), u = n * (l._$Lr() + 1), a = 0; a < r; ++a) t[a] += (a / s | 0) % 2 == 0 ? $ : u;
						i[_++] = l._$SL(), s *= 2
					}
					n *= l._$N2()
				}
				t[r] = 65535, i[_] = -1
			}, D.prototype._$h2 = function(t, i, e) {
				for (var r = new Float32Array(i), o = 0; o < i; ++o) r[o] = e[o];
				var n = new x;
				n._$yP(t), n._$t2(i, r), this._$Ob.push(n)
			}, D.prototype._$J2 = function(t) {
				for (var i = t, e = this._$Ob.length, r = 0; r < e; ++r) {
					var o = this._$Ob[r],
						n = o._$N2(),
						s = i % o._$N2(),
						_ = o._$d2()[s];
					console.log("%s[%d]=%7.2f / ", o.getParamID(), s, _), i /= n
				}
				console.log("\n")
			}, D.prototype.getParamCount = function() {
				return this._$Ob.length
			}, D.prototype._$zs = function() {
				return this._$Ob
			}, R.prototype.identity = function() {
				for (var t = 0; t < 16; t++) this.m[t] = t % 5 == 0 ? 1 : 0
			}, R.prototype.getArray = function() {
				return this.m
			}, R.prototype.getCopyMatrix = function() {
				return new Float32Array(this.m)
			}, R.prototype.setMatrix = function(t) {
				if (null != t && 16 == t.length)
					for (var i = 0; i < 16; i++) this.m[i] = t[i]
			}, R.prototype.mult = function(t, i, e) {
				return null == i ? null : (this == i ? this.mult_safe(this.m, t.m, i.m, e) : this.mult_fast(this.m, t.m, i.m, e), i)
			}, R.prototype.mult_safe = function(t, i, e, r) {
				if (t == e) {
					var o = new Array(16);
					this.mult_fast(t, i, o, r);
					for (var n = 15; n >= 0; --n) e[n] = o[n]
				} else this.mult_fast(t, i, e, r)
			}, R.prototype.mult_fast = function(t, i, e, r) {
				r ? (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2], e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6], e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10], e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12], e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2], e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6], e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10], e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13], e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2], e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6], e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10], e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14], e[3] = e[7] = e[11] = 0, e[15] = 1) : (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2] + t[12] * i[3], e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6] + t[12] * i[7], e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10] + t[12] * i[11], e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12] * i[15], e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2] + t[13] * i[3], e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6] + t[13] * i[7], e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10] + t[13] * i[11], e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13] * i[15], e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2] + t[14] * i[3], e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6] + t[14] * i[7], e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10] + t[14] * i[11], e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14] * i[15], e[3] = t[3] * i[0] + t[7] * i[1] + t[11] * i[2] + t[15] * i[3], e[7] = t[3] * i[4] + t[7] * i[5] + t[11] * i[6] + t[15] * i[7], e[11] = t[3] * i[8] + t[7] * i[9] + t[11] * i[10] + t[15] * i[11], e[15] = t[3] * i[12] + t[7] * i[13] + t[11] * i[14] + t[15] * i[15])
			}, R.prototype.translate = function(t, i, e) {
				this.m[12] = this.m[0] * t + this.m[4] * i + this.m[8] * e + this.m[12], this.m[13] = this.m[1] * t + this.m[5] * i + this.m[9] * e + this.m[13], this.m[14] = this.m[2] * t + this.m[6] * i + this.m[10] * e + this.m[14], this.m[15] = this.m[3] * t + this.m[7] * i + this.m[11] * e + this.m[15]
			}, R.prototype.scale = function(t, i, e) {
				this.m[0] *= t, this.m[4] *= i, this.m[8] *= e, this.m[1] *= t, this.m[5] *= i, this.m[9] *= e, this.m[2] *= t, this.m[6] *= i, this.m[10] *= e, this.m[3] *= t, this.m[7] *= i, this.m[11] *= e
			}, R.prototype.rotateX = function(t) {
				var i = Lt.fcos(t),
					e = Lt._$9(t),
					r = this.m[4];
				this.m[4] = r * i + this.m[8] * e, this.m[8] = r * -e + this.m[8] * i, r = this.m[5], this.m[5] = r * i + this.m[9] * e, this.m[9] = r * -e + this.m[9] * i, r = this.m[6], this.m[6] = r * i + this.m[10] * e, this.m[10] = r * -e + this.m[10] * i, r = this.m[7], this.m[7] = r * i + this.m[11] * e, this.m[11] = r * -e + this.m[11] * i
			}, R.prototype.rotateY = function(t) {
				var i = Lt.fcos(t),
					e = Lt._$9(t),
					r = this.m[0];
				this.m[0] = r * i + this.m[8] * -e, this.m[8] = r * e + this.m[8] * i, r = this.m[1], this.m[1] = r * i + this.m[9] * -e, this.m[9] = r * e + this.m[9] * i, r = m[2], this.m[2] = r * i + this.m[10] * -e, this.m[10] = r * e + this.m[10] * i, r = m[3], this.m[3] = r * i + this.m[11] * -e, this.m[11] = r * e + this.m[11] * i
			}, R.prototype.rotateZ = function(t) {
				var i = Lt.fcos(t),
					e = Lt._$9(t),
					r = this.m[0];
				this.m[0] = r * i + this.m[4] * e, this.m[4] = r * -e + this.m[4] * i, r = this.m[1], this.m[1] = r * i + this.m[5] * e, this.m[5] = r * -e + this.m[5] * i, r = this.m[2], this.m[2] = r * i + this.m[6] * e, this.m[6] = r * -e + this.m[6] * i, r = this.m[3], this.m[3] = r * i + this.m[7] * e, this.m[7] = r * -e + this.m[7] * i
			}, b.prototype = new et, b._$tP = new Object, b._$27 = function() {
				b._$tP.clear()
			}, b.getID = function(t) {
				var i = b._$tP[t];
				return null == i && (i = new b(t), b._$tP[t] = i), i
			}, b.prototype._$3s = function() {
				return new b
			}, F._$kS = -1, F._$pS = 0, F._$hb = 1, F.STATE_IDENTITY = 0, F._$gb = 1, F._$fo = 2, F._$go = 4, F.prototype.transform = function(t, i, e) {
				var r, o, n, s, _, a, h = 0,
					l = 0;
				switch (this._$hi) {
					default:
						return;
					case F._$go | F._$fo | F._$gb:
						for (r = this._$7, o = this._$H, n = this._$k, s = this._$f, _ = this._$g, a = this._$w; --e >= 0;) {
							var $ = t[h++],
								u = t[h++];
							i[l++] = r * $ + o * u + n, i[l++] = s * $ + _ * u + a
						}
						return;
					case F._$go | F._$fo:
						for (r = this._$7, o = this._$H, s = this._$f, _ = this._$g; --e >= 0;) {
							var $ = t[h++],
								u = t[h++];
							i[l++] = r * $ + o * u, i[l++] = s * $ + _ * u
						}
						return;
					case F._$go | F._$gb:
						for (o = this._$H, n = this._$k, s = this._$f, a = this._$w; --e >= 0;) {
							var $ = t[h++];
							i[l++] = o * t[h++] + n, i[l++] = s * $ + a
						}
						return;
					case F._$go:
						for (o = this._$H, s = this._$f; --e >= 0;) {
							var $ = t[h++];
							i[l++] = o * t[h++], i[l++] = s * $
						}
						return;
					case F._$fo | F._$gb:
						for (r = this._$7, n = this._$k, _ = this._$g, a = this._$w; --e >= 0;) i[l++] = r * t[h++] + n, i[l++] = _ * t[h++] + a;
						return;
					case F._$fo:
						for (r = this._$7, _ = this._$g; --e >= 0;) i[l++] = r * t[h++], i[l++] = _ * t[h++];
						return;
					case F._$gb:
						for (n = this._$k, a = this._$w; --e >= 0;) i[l++] = t[h++] + n, i[l++] = t[h++] + a;
						return;
					case F.STATE_IDENTITY:
						return void(t == i && h == l || w._$jT(t, h, i, l, 2 * e))
				}
			}, F.prototype.update = function() {
				0 == this._$H && 0 == this._$f ? 1 == this._$7 && 1 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F.STATE_IDENTITY, this._$Z = F._$pS) : (this._$hi = F._$gb, this._$Z = F._$hb) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$fo, this._$Z = F._$kS) : (this._$hi = F._$fo | F._$gb, this._$Z = F._$kS) : 0 == this._$7 && 0 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go, this._$Z = F._$kS) : (this._$hi = F._$go | F._$gb, this._$Z = F._$kS) : 0 == this._$k && 0 == this._$w ? (this._$hi = F._$go | F._$fo, this._$Z = F._$kS) : (this._$hi = F._$go | F._$fo | F._$gb, this._$Z = F._$kS)
			}, F.prototype._$RT = function(t) {
				this._$IT(t);
				var i = t[0],
					e = t[2],
					r = t[1],
					o = t[3],
					n = Math.sqrt(i * i + r * r),
					s = i * o - e * r;
				0 == n ? at._$so && console.log("affine._$RT() / rt==0") : (t[0] = n, t[1] = s / n, t[2] = (r * o + i * e) / s, t[3] = Math.atan2(r, i))
			}, F.prototype._$ho = function(t, i, e, r) {
				var o = new Float32Array(6),
					n = new Float32Array(6);
				t._$RT(o), i._$RT(n);
				var s = new Float32Array(6);
				s[0] = o[0] + (n[0] - o[0]) * e, s[1] = o[1] + (n[1] - o[1]) * e, s[2] = o[2] + (n[2] - o[2]) * e, s[3] = o[3] + (n[3] - o[3]) * e, s[4] = o[4] + (n[4] - o[4]) * e, s[5] = o[5] + (n[5] - o[5]) * e, r._$CT(s)
			}, F.prototype._$CT = function(t) {
				var i = Math.cos(t[3]),
					e = Math.sin(t[3]);
				this._$7 = t[0] * i, this._$f = t[0] * e, this._$H = t[1] * (t[2] * i - e), this._$g = t[1] * (t[2] * e + i), this._$k = t[4], this._$w = t[5], this.update()
			}, F.prototype._$IT = function(t) {
				t[0] = this._$7, t[1] = this._$f, t[2] = this._$H, t[3] = this._$g, t[4] = this._$k, t[5] = this._$w
			}, C.prototype = new s, C._$cs = "VISIBLE:", C._$ar = "LAYOUT:", C._$Co = 0, C._$D2 = [], C._$1T = 1, C.loadMotion = function(t) {
				var i = new C,
					e = [0],
					r = t.length;
				i._$yT = 0;
				for (var o = 0; o < r; ++o) {
					var n = 255 & t[o];
					if ("\n" != n && "\r" != n)
						if ("#" != n)
							if ("$" != n) {
								if ("a" <= n && n <= "z" || "A" <= n && n <= "Z" || "_" == n) {
									for (var s = o, _ = -1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o)
										if ("=" == n) {
											_ = o;
											break
										} if (_ >= 0) {
										var a = new B;
										O.startsWith(t, s, C._$cs) ? (a._$RP = B._$hs, a._$4P = new String(t, s, _ - s)) : O.startsWith(t, s, C._$ar) ? (a._$4P = new String(t, s + 7, _ - s - 7), O.startsWith(t, s + 7, "ANCHOR_X") ? a._$RP = B._$xs : O.startsWith(t, s + 7, "ANCHOR_Y") ? a._$RP = B._$us : O.startsWith(t, s + 7, "SCALE_X") ? a._$RP = B._$qs : O.startsWith(t, s + 7, "SCALE_Y") ? a._$RP = B._$Ys : O.startsWith(t, s + 7, "X") ? a._$RP = B._$ws : O.startsWith(t, s + 7, "Y") && (a._$RP = B._$Ns)) : (a._$RP = B._$Fr, a._$4P = new String(t, s, _ - s)), i.motions.push(a);
										var h = 0;
										for (C._$D2.clear(), o = _ + 1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o)
											if ("," != n && " " != n && "\t" != n) {
												var l = O._$LS(t, r, o, e);
												if (e[0] > 0) {
													C._$D2.push(l), h++;
													var $ = e[0];
													if ($ < o) {
														console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
														break
													}
													o = $
												}
											} a._$I0 = C._$D2._$BL(), h > i._$yT && (i._$yT = h)
									}
								}
							} else {
								for (var s = o, _ = -1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o)
									if ("=" == n) {
										_ = o;
										break
									} var u = !1;
								if (_ >= 0)
									for (_ == s + 4 && "f" == t[s + 1] && "p" == t[s + 2] && "s" == t[s + 3] && (u = !0), o = _ + 1; o < r && ("\r" != (n = 255 & t[o]) && "\n" != n); ++o)
										if ("," != n && " " != n && "\t" != n) {
											var l = O._$LS(t, r, o, e);
											e[0] > 0 && u && 5 < l && l < 121 && (i._$D0 = l), o = e[0]
										} for (; o < r && ("\n" != t[o] && "\r" != t[o]); ++o);
							}
					else
						for (; o < r && ("\n" != t[o] && "\r" != t[o]); ++o);
				}
				return i._$AS = 1e3 * i._$yT / i._$D0 | 0, i
			}, C.prototype.getDurationMSec = function() {
				return this._$AS
			}, C.prototype.dump = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t];
					console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
					for (var e = 0; e < i._$I0.length && e < 10; e++) console.log("%5.2f ,", i._$I0[e]);
					console.log("\n")
				}
			}, C.prototype.updateParamExe = function(t, i, e, r) {
				for (var o = i - r._$z2, n = o * this._$D0 / 1e3, s = 0 | n, _ = n - s, a = 0; a < this.motions.length; a++) {
					var h = this.motions[a],
						l = h._$I0.length,
						$ = h._$4P;
					if (h._$RP == B._$hs) {
						var u = h._$I0[s >= l ? l - 1 : s];
						t.setParamFloat($, u)
					} else if (B._$ws <= h._$RP && h._$RP <= B._$Ys);
					else {
						var p = t.getParamFloat($),
							f = h._$I0[s >= l ? l - 1 : s],
							c = h._$I0[s + 1 >= l ? l - 1 : s + 1],
							d = f + (c - f) * _,
							g = p + (d - p) * e;
						t.setParamFloat($, g)
					}
				}
				s >= this._$yT && (this._$E ? (r._$z2 = i, this.loopFadeIn && (r._$bs = i)) : r._$9L = !0)
			}, C.prototype._$r0 = function() {
				return this._$E
			}, C.prototype._$aL = function(t) {
				this._$E = t
			}, C.prototype.isLoopFadeIn = function() {
				return this.loopFadeIn
			}, C.prototype.setLoopFadeIn = function(t) {
				this.loopFadeIn = t
			}, N.prototype.clear = function() {
				this.size = 0
			}, N.prototype.add = function(t) {
				if (this._$P.length <= this.size) {
					var i = new Float32Array(2 * this.size);
					w._$jT(this._$P, 0, i, 0, this.size), this._$P = i
				}
				this._$P[this.size++] = t
			}, N.prototype._$BL = function() {
				var t = new Float32Array(this.size);
				return w._$jT(this._$P, 0, t, 0, this.size), t
			}, B._$Fr = 0, B._$hs = 1, B._$ws = 100, B._$Ns = 101, B._$xs = 102, B._$us = 103, B._$qs = 104, B._$Ys = 105, U._$Ms = 1, U._$Qs = 2, U._$i2 = 0, U._$No = 2, U._$do = U._$Ms, U._$Ls = !0, U._$1r = 5, U._$Qb = 65, U._$J = 1e-4, U._$FT = .001, U._$Ss = 3, G._$o7 = 6, G._$S7 = 7, G._$s7 = 8, G._$77 = 9, G.LIVE2D_FORMAT_VERSION_V2_10_SDK2 = 10, G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1 = 11, G._$T7 = G.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1, G._$Is = -2004318072, G._$h0 = 0, G._$4L = 23, G._$7P = 33, G._$uT = function(t) {
				console.log("_$bo :: _$6 _$mo _$E0 : %d\n", t)
			}, G._$9o = function(t) {
				if (t < 40) return G._$uT(t), null;
				if (t < 50) return G._$uT(t), null;
				if (t < 60) return G._$uT(t), null;
				if (t < 100) switch (t) {
					case 65:
						return new Z;
					case 66:
						return new D;
					case 67:
						return new x;
					case 68:
						return new z;
					case 69:
						return new P;
					case 70:
						return new $t;
					default:
						return G._$uT(t), null
				} else if (t < 150) switch (t) {
					case 131:
						return new st;
					case 133:
						return new tt;
					case 136:
						return new p;
					case 137:
						return new ot;
					case 142:
						return new j
				}
				return G._$uT(t), null
			}, Y._$HP = 0, Y._$_0 = !0;
			Y._$V2 = -1, Y._$W0 = -1, Y._$jr = !1, Y._$ZS = !0, Y._$tr = -1e6, Y._$lr = 1e6, Y._$is = 32, Y._$e = !1, Y.prototype.getDrawDataIndex = function(t) {
				for (var i = this._$aS.length - 1; i >= 0; --i)
					if (null != this._$aS[i] && this._$aS[i].getDrawDataID() == t) return i;
				return -1
			}, Y.prototype.getDrawData = function(t) {
				if (t instanceof b) {
					if (null == this._$Bo) {
						this._$Bo = new Object;
						for (var i = this._$aS.length, e = 0; e < i; e++) {
							var r = this._$aS[e],
								o = r.getDrawDataID();
							null != o && (this._$Bo[o] = r)
						}
					}
					return this._$Bo[id]
				}
				return t < this._$aS.length ? this._$aS[t] : null
			}, Y.prototype.release = function() {
				this._$3S.clear(), this._$aS.clear(), this._$F2.clear(), null != this._$Bo && this._$Bo.clear(), this._$db.clear(), this._$8b.clear(), this._$Hr.clear()
			}, Y.prototype.init = function() {
				this._$co++, this._$F2.length > 0 && this.release();
				for (var t = this._$Ri.getModelImpl(), i = t._$Xr(), r = i.length, o = new Array, n = new Array, s = 0; s < r; ++s) {
					var _ = i[s];
					this._$F2.push(_), this._$Hr.push(_.init(this));
					for (var a = _.getBaseData(), h = a.length, l = 0; l < h; ++l) o.push(a[l]);
					for (var l = 0; l < h; ++l) {
						var $ = a[l].init(this);
						$._$l2(s), n.push($)
					}
					for (var u = _.getDrawData(), p = u.length, l = 0; l < p; ++l) {
						var f = u[l],
							c = f.init(this);
						c._$IP = s, this._$aS.push(f), this._$8b.push(c)
					}
				}
				for (var d = o.length, g = yt._$2o();;) {
					for (var y = !1, s = 0; s < d; ++s) {
						var m = o[s];
						if (null != m) {
							var T = m.getTargetBaseDataID();
							(null == T || T == g || this.getBaseDataIndex(T) >= 0) && (this._$3S.push(m), this._$db.push(n[s]), o[s] = null, y = !0)
						}
					}
					if (!y) break
				}
				var P = t._$E2();
				if (null != P) {
					var S = P._$1s();
					if (null != S)
						for (var v = S.length, s = 0; s < v; ++s) {
							var L = S[s];
							null != L && this._$02(L.getParamID(), L.getDefaultValue(), L.getMinValue(), L.getMaxValue())
						}
				}
				this.clipManager = new e(this.dp_webgl), this.clipManager.init(this, this._$aS, this._$8b), this._$QT = !0
			}, Y.prototype.update = function() {
				Y._$e && _.start("_$zL");
				for (var t = this._$_2.length, i = 0; i < t; i++) this._$_2[i] != this._$vr[i] && (this._$Js[i] = Y._$ZS, this._$vr[i] = this._$_2[i]);
				var e = this._$3S.length,
					r = this._$aS.length,
					o = W._$or(),
					n = W._$Pr(),
					s = n - o + 1;
				(null == this._$Ws || this._$Ws.length < s) && (this._$Ws = new Int16Array(s), this._$Vs = new Int16Array(s));
				for (var i = 0; i < s; i++) this._$Ws[i] = Y._$V2, this._$Vs[i] = Y._$V2;
				(null == this._$Er || this._$Er.length < r) && (this._$Er = new Int16Array(r));
				for (var i = 0; i < r; i++) this._$Er[i] = Y._$W0;
				Y._$e && _.dump("_$zL"), Y._$e && _.start("_$UL");
				for (var a = null, h = 0; h < e; ++h) {
					var l = this._$3S[h],
						$ = this._$db[h];
					try {
						l._$Nr(this, $), l._$2b(this, $)
					} catch (t) {
						null == a && (a = t)
					}
				}
				null != a && Y._$_0 && _._$Rb(a), Y._$e && _.dump("_$UL"), Y._$e && _.start("_$DL");
				for (var u = null, p = 0; p < r; ++p) {
					var f = this._$aS[p],
						c = this._$8b[p];
					try {
						if (f._$Nr(this, c), c._$u2()) continue;
						f._$2b(this, c);
						var d, g = Math.floor(f._$zS(this, c) - o);
						try {
							d = this._$Vs[g]
						} catch (t) {
							console.log("_$li :: %s / %s \t\t\t\t@@_$fS\n", t.toString(), f.getDrawDataID().toString()), g = Math.floor(f._$zS(this, c) - o);
							continue
						}
						d == Y._$V2 ? this._$Ws[g] = p : this._$Er[d] = p, this._$Vs[g] = p
					} catch (t) {
						null == u && (u = t, at._$sT(at._$H7))
					}
				}
				null != u && Y._$_0 && _._$Rb(u), Y._$e && _.dump("_$DL"), Y._$e && _.start("_$eL");
				for (var i = this._$Js.length - 1; i >= 0; i--) this._$Js[i] = Y._$jr;
				return this._$QT = !1, Y._$e && _.dump("_$eL"), !1
			}, Y.prototype.preDraw = function(t) {
				null != this.clipManager && (t._$ZT(), this.clipManager.setupClip(this, t))
			}, Y.prototype.draw = function(t) {
				if (null == this._$Ws) return void _._$li("call _$Ri.update() before _$Ri.draw() ");
				var i = this._$Ws.length;
				t._$ZT();
				for (var e = 0; e < i; ++e) {
					var r = this._$Ws[e];
					if (r != Y._$V2)
						for (;;) {
							var o = this._$aS[r],
								n = this._$8b[r];
							if (n._$yo()) {
								var s = n._$IP,
									a = this._$Hr[s];
								n._$VS = a.getPartsOpacity(), o.draw(t, this, n)
							}
							var h = this._$Er[r];
							if (h <= r || h == Y._$W0) break;
							r = h
						}
				}
			}, Y.prototype.getParamIndex = function(t) {
				for (var i = this._$pb.length - 1; i >= 0; --i)
					if (this._$pb[i] == t) return i;
				return this._$02(t, 0, Y._$tr, Y._$lr)
			}, Y.prototype._$BS = function(t) {
				return this.getBaseDataIndex(t)
			}, Y.prototype.getBaseDataIndex = function(t) {
				for (var i = this._$3S.length - 1; i >= 0; --i)
					if (null != this._$3S[i] && this._$3S[i].getBaseDataID() == t) return i;
				return -1
			}, Y.prototype._$UT = function(t, i) {
				var e = new Float32Array(i);
				return w._$jT(t, 0, e, 0, t.length), e
			}, Y.prototype._$02 = function(t, i, e, r) {
				if (this._$qo >= this._$pb.length) {
					var o = this._$pb.length,
						n = new Array(2 * o);
					w._$jT(this._$pb, 0, n, 0, o), this._$pb = n, this._$_2 = this._$UT(this._$_2, 2 * o), this._$vr = this._$UT(this._$vr, 2 * o), this._$Rr = this._$UT(this._$Rr, 2 * o), this._$Or = this._$UT(this._$Or, 2 * o);
					var s = new Array;
					w._$jT(this._$Js, 0, s, 0, o), this._$Js = s
				}
				return this._$pb[this._$qo] = t, this._$_2[this._$qo] = i, this._$vr[this._$qo] = i, this._$Rr[this._$qo] = e, this._$Or[this._$qo] = r, this._$Js[this._$qo] = Y._$ZS, this._$qo++
			}, Y.prototype._$Zo = function(t, i) {
				this._$3S[t] = i
			}, Y.prototype.setParamFloat = function(t, i) {
				i < this._$Rr[t] && (i = this._$Rr[t]), i > this._$Or[t] && (i = this._$Or[t]), this._$_2[t] = i
			}, Y.prototype.loadParam = function() {
				var t = this._$_2.length;
				t > this._$fs.length && (t = this._$fs.length), w._$jT(this._$fs, 0, this._$_2, 0, t)
			}, Y.prototype.saveParam = function() {
				var t = this._$_2.length;
				t > this._$fs.length && (this._$fs = new Float32Array(t)), w._$jT(this._$_2, 0, this._$fs, 0, t)
			}, Y.prototype._$v2 = function() {
				return this._$co
			}, Y.prototype._$WS = function() {
				return this._$QT
			}, Y.prototype._$Xb = function(t) {
				return this._$Js[t] == Y._$ZS
			}, Y.prototype._$vs = function() {
				return this._$Es
			}, Y.prototype._$Tr = function() {
				return this._$ZP
			}, Y.prototype.getBaseData = function(t) {
				return this._$3S[t]
			}, Y.prototype.getParamFloat = function(t) {
				return this._$_2[t]
			}, Y.prototype.getParamMax = function(t) {
				return this._$Or[t]
			}, Y.prototype.getParamMin = function(t) {
				return this._$Rr[t]
			}, Y.prototype.setPartsOpacity = function(t, i) {
				this._$Hr[t].setPartsOpacity(i)
			}, Y.prototype.getPartsOpacity = function(t) {
				return this._$Hr[t].getPartsOpacity()
			}, Y.prototype.getPartsDataIndex = function(t) {
				for (var i = this._$F2.length - 1; i >= 0; --i)
					if (null != this._$F2[i] && this._$F2[i]._$p2() == t) return i;
				return -1
			}, Y.prototype._$q2 = function(t) {
				return this._$db[t]
			}, Y.prototype._$C2 = function(t) {
				return this._$8b[t]
			}, Y.prototype._$Bb = function(t) {
				return this._$Hr[t]
			}, Y.prototype._$5s = function(t, i) {
				for (var e = this._$Ws.length, r = t, o = 0; o < e; ++o) {
					var n = this._$Ws[o];
					if (n != Y._$V2)
						for (;;) {
							var s = this._$8b[n];
							s._$yo() && (s._$GT()._$B2(this, s, r), r += i);
							var _ = this._$Er[n];
							if (_ <= n || _ == Y._$W0) break;
							n = _
						}
				}
			}, Y.prototype.setDrawParam = function(t) {
				this.dp_webgl = t
			}, Y.prototype.getDrawParam = function() {
				return this.dp_webgl
			}, k._$0T = function(t) {
				return k._$0T(new _$5(t))
			}, k._$0T = function(t) {
				if (!t.exists()) throw new _$ls(t._$3b());
				for (var i, e = t.length(), r = new Int8Array(e), o = new _$Xs(new _$kb(t), 8192), n = 0;
					(i = o.read(r, n, e - n)) > 0;) n += i;
				return r
			}, k._$C = function(t) {
				var i = null,
					e = null;
				try {
					i = t instanceof Array ? t : new _$Xs(t, 8192), e = new _$js;
					for (var r, o = new Int8Array(1e3);
						(r = i.read(o)) > 0;) e.write(o, 0, r);
					return e._$TS()
				} finally {
					null != t && t.close(), null != e && (e.flush(), e.close())
				}
			}, V.prototype._$T2 = function() {
				return w.getUserTimeMSec() + Math._$10() * (2 * this._$Br - 1)
			}, V.prototype._$uo = function(t) {
				this._$Br = t
			}, V.prototype._$QS = function(t, i, e) {
				this._$Dr = t, this._$Cb = i, this._$mr = e
			}, V.prototype._$7T = function(t) {
				var i, e = w.getUserTimeMSec(),
					r = 0;
				switch (this._$_L) {
					case STATE_CLOSING:
						r = (e - this._$bb) / this._$Dr, r >= 1 && (r = 1, this._$_L = wt.STATE_CLOSED, this._$bb = e), i = 1 - r;
						break;
					case STATE_CLOSED:
						r = (e - this._$bb) / this._$Cb, r >= 1 && (this._$_L = wt.STATE_OPENING, this._$bb = e), i = 0;
						break;
					case STATE_OPENING:
						r = (e - this._$bb) / this._$mr, r >= 1 && (r = 1, this._$_L = wt.STATE_INTERVAL, this._$12 = this._$T2()), i = r;
						break;
					case STATE_INTERVAL:
						this._$12 < e && (this._$_L = wt.STATE_CLOSING, this._$bb = e), i = 1;
						break;
					case STATE_FIRST:
					default:
						this._$_L = wt.STATE_INTERVAL, this._$12 = this._$T2(), i = 1
				}
				this._$jo || (i = -i), t.setParamFloat(this._$iL, i), t.setParamFloat(this._$0L, i)
			};
			var wt = function() {};
			wt.STATE_FIRST = "STATE_FIRST", wt.STATE_INTERVAL = "STATE_INTERVAL", wt.STATE_CLOSING = "STATE_CLOSING", wt.STATE_CLOSED = "STATE_CLOSED", wt.STATE_OPENING = "STATE_OPENING", X.prototype = new E, X._$As = 32, X._$Gr = !1, X._$NT = null, X._$vS = null, X._$no = null, X._$9r = function(t) {
				return new Float32Array(t)
			}, X._$vb = function(t) {
				return new Int16Array(t)
			}, X._$cr = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = X._$9r(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, X._$mb = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = X._$vb(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, X._$Hs = function() {
				return X._$Gr
			}, X._$as = function(t) {
				X._$Gr = t
			}, X.prototype.setGL = function(t) {
				this.gl = t
			}, X.prototype.setTransform = function(t) {
				this.transform = t
			}, X.prototype._$ZT = function() {}, X.prototype._$Uo = function(t, i, e, r, o, n, s, _) {
				if (!(n < .01)) {
					var a = this._$U2[t],
						h = n > .9 ? at.EXPAND_W : 0;
					this.gl.drawElements(a, e, r, o, n, h, this.transform, _)
				}
			}, X.prototype._$Rs = function() {
				throw new Error("_$Rs")
			}, X.prototype._$Ds = function(t) {
				throw new Error("_$Ds")
			}, X.prototype._$K2 = function() {
				for (var t = 0; t < this._$sb.length; t++) {
					0 != this._$sb[t] && (this.gl._$Sr(1, this._$sb, t), this._$sb[t] = 0)
				}
			}, X.prototype.setTexture = function(t, i) {
				this._$sb.length < t + 1 && this._$nS(t), this._$sb[t] = i
			}, X.prototype.setTexture = function(t, i) {
				this._$sb.length < t + 1 && this._$nS(t), this._$U2[t] = i
			}, X.prototype._$nS = function(t) {
				var i = Math.max(2 * this._$sb.length, t + 1 + 10),
					e = new Int32Array(i);
				w._$jT(this._$sb, 0, e, 0, this._$sb.length), this._$sb = e;
				var r = new Array;
				w._$jT(this._$U2, 0, r, 0, this._$U2.length), this._$U2 = r
			}, z.prototype = new I, z._$Xo = new Float32Array(2), z._$io = new Float32Array(2), z._$0o = new Float32Array(2), z._$Lo = new Float32Array(2), z._$To = new Float32Array(2), z._$Po = new Float32Array(2), z._$gT = new Array, z.prototype._$zP = function() {
				this._$GS = new D, this._$GS._$zP(), this._$Y0 = new Array
			}, z.prototype.getType = function() {
				return I._$c2
			}, z.prototype._$F0 = function(t) {
				I.prototype._$F0.call(this, t), this._$GS = t._$nP(), this._$Y0 = t._$nP(), I.prototype.readV2_opacity.call(this, t)
			}, z.prototype.init = function(t) {
				var i = new H(this);
				return i._$Yr = new P, this._$32() && (i._$Wr = new P), i
			}, z.prototype._$Nr = function(t, i) {
				this != i._$GT() && console.log("### assert!! ### ");
				var e = i;
				if (this._$GS._$Ur(t)) {
					var r = z._$gT;
					r[0] = !1;
					var o = this._$GS._$Q2(t, r);
					i._$Ib(r[0]), this.interpolateOpacity(t, this._$GS, i, r);
					var n = t._$vs(),
						s = t._$Tr();
					if (this._$GS._$zr(n, s, o), o <= 0) {
						var _ = this._$Y0[n[0]];
						e._$Yr.init(_)
					} else if (1 == o) {
						var _ = this._$Y0[n[0]],
							a = this._$Y0[n[1]],
							h = s[0];
						e._$Yr._$fL = _._$fL + (a._$fL - _._$fL) * h, e._$Yr._$gL = _._$gL + (a._$gL - _._$gL) * h, e._$Yr._$B0 = _._$B0 + (a._$B0 - _._$B0) * h, e._$Yr._$z0 = _._$z0 + (a._$z0 - _._$z0) * h, e._$Yr._$qT = _._$qT + (a._$qT - _._$qT) * h
					} else if (2 == o) {
						var _ = this._$Y0[n[0]],
							a = this._$Y0[n[1]],
							l = this._$Y0[n[2]],
							$ = this._$Y0[n[3]],
							h = s[0],
							u = s[1],
							p = _._$fL + (a._$fL - _._$fL) * h,
							f = l._$fL + ($._$fL - l._$fL) * h;
						e._$Yr._$fL = p + (f - p) * u, p = _._$gL + (a._$gL - _._$gL) * h, f = l._$gL + ($._$gL - l._$gL) * h, e._$Yr._$gL = p + (f - p) * u, p = _._$B0 + (a._$B0 - _._$B0) * h, f = l._$B0 + ($._$B0 - l._$B0) * h, e._$Yr._$B0 = p + (f - p) * u, p = _._$z0 + (a._$z0 - _._$z0) * h, f = l._$z0 + ($._$z0 - l._$z0) * h, e._$Yr._$z0 = p + (f - p) * u, p = _._$qT + (a._$qT - _._$qT) * h, f = l._$qT + ($._$qT - l._$qT) * h, e._$Yr._$qT = p + (f - p) * u
					} else if (3 == o) {
						var c = this._$Y0[n[0]],
							d = this._$Y0[n[1]],
							g = this._$Y0[n[2]],
							y = this._$Y0[n[3]],
							m = this._$Y0[n[4]],
							T = this._$Y0[n[5]],
							P = this._$Y0[n[6]],
							S = this._$Y0[n[7]],
							h = s[0],
							u = s[1],
							v = s[2],
							p = c._$fL + (d._$fL - c._$fL) * h,
							f = g._$fL + (y._$fL - g._$fL) * h,
							L = m._$fL + (T._$fL - m._$fL) * h,
							M = P._$fL + (S._$fL - P._$fL) * h;
						e._$Yr._$fL = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$gL + (d._$gL - c._$gL) * h, f = g._$gL + (y._$gL - g._$gL) * h, L = m._$gL + (T._$gL - m._$gL) * h, M = P._$gL + (S._$gL - P._$gL) * h, e._$Yr._$gL = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$B0 + (d._$B0 - c._$B0) * h, f = g._$B0 + (y._$B0 - g._$B0) * h, L = m._$B0 + (T._$B0 - m._$B0) * h, M = P._$B0 + (S._$B0 - P._$B0) * h, e._$Yr._$B0 = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$z0 + (d._$z0 - c._$z0) * h, f = g._$z0 + (y._$z0 - g._$z0) * h, L = m._$z0 + (T._$z0 - m._$z0) * h, M = P._$z0 + (S._$z0 - P._$z0) * h, e._$Yr._$z0 = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u), p = c._$qT + (d._$qT - c._$qT) * h, f = g._$qT + (y._$qT - g._$qT) * h, L = m._$qT + (T._$qT - m._$qT) * h, M = P._$qT + (S._$qT - P._$qT) * h, e._$Yr._$qT = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)
					} else if (4 == o) {
						var E = this._$Y0[n[0]],
							A = this._$Y0[n[1]],
							I = this._$Y0[n[2]],
							w = this._$Y0[n[3]],
							x = this._$Y0[n[4]],
							O = this._$Y0[n[5]],
							D = this._$Y0[n[6]],
							R = this._$Y0[n[7]],
							b = this._$Y0[n[8]],
							F = this._$Y0[n[9]],
							C = this._$Y0[n[10]],
							N = this._$Y0[n[11]],
							B = this._$Y0[n[12]],
							U = this._$Y0[n[13]],
							G = this._$Y0[n[14]],
							Y = this._$Y0[n[15]],
							h = s[0],
							u = s[1],
							v = s[2],
							k = s[3],
							p = E._$fL + (A._$fL - E._$fL) * h,
							f = I._$fL + (w._$fL - I._$fL) * h,
							L = x._$fL + (O._$fL - x._$fL) * h,
							M = D._$fL + (R._$fL - D._$fL) * h,
							V = b._$fL + (F._$fL - b._$fL) * h,
							X = C._$fL + (N._$fL - C._$fL) * h,
							H = B._$fL + (U._$fL - B._$fL) * h,
							W = G._$fL + (Y._$fL - G._$fL) * h;
						e._$Yr._$fL = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$gL + (A._$gL - E._$gL) * h, f = I._$gL + (w._$gL - I._$gL) * h, L = x._$gL + (O._$gL - x._$gL) * h, M = D._$gL + (R._$gL - D._$gL) * h, V = b._$gL + (F._$gL - b._$gL) * h, X = C._$gL + (N._$gL - C._$gL) * h, H = B._$gL + (U._$gL - B._$gL) * h, W = G._$gL + (Y._$gL - G._$gL) * h, e._$Yr._$gL = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$B0 + (A._$B0 - E._$B0) * h, f = I._$B0 + (w._$B0 - I._$B0) * h, L = x._$B0 + (O._$B0 - x._$B0) * h, M = D._$B0 + (R._$B0 - D._$B0) * h, V = b._$B0 + (F._$B0 - b._$B0) * h, X = C._$B0 + (N._$B0 - C._$B0) * h, H = B._$B0 + (U._$B0 - B._$B0) * h, W = G._$B0 + (Y._$B0 - G._$B0) * h, e._$Yr._$B0 = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$z0 + (A._$z0 - E._$z0) * h, f = I._$z0 + (w._$z0 - I._$z0) * h, L = x._$z0 + (O._$z0 - x._$z0) * h, M = D._$z0 + (R._$z0 - D._$z0) * h, V = b._$z0 + (F._$z0 - b._$z0) * h, X = C._$z0 + (N._$z0 - C._$z0) * h, H = B._$z0 + (U._$z0 - B._$z0) * h, W = G._$z0 + (Y._$z0 - G._$z0) * h, e._$Yr._$z0 = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u)), p = E._$qT + (A._$qT - E._$qT) * h, f = I._$qT + (w._$qT - I._$qT) * h, L = x._$qT + (O._$qT - x._$qT) * h, M = D._$qT + (R._$qT - D._$qT) * h, V = b._$qT + (F._$qT - b._$qT) * h, X = C._$qT + (N._$qT - C._$qT) * h, H = B._$qT + (U._$qT - B._$qT) * h, W = G._$qT + (Y._$qT - G._$qT) * h, e._$Yr._$qT = (1 - k) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + k * ((1 - v) * (V + (X - V) * u) + v * (H + (W - H) * u))
					} else {
						for (var j = 0 | Math.pow(2, o), q = new Float32Array(j), J = 0; J < j; J++) {
							for (var Q = J, Z = 1, K = 0; K < o; K++) Z *= Q % 2 == 0 ? 1 - s[K] : s[K], Q /= 2;
							q[J] = Z
						}
						for (var tt = new Array, it = 0; it < j; it++) tt[it] = this._$Y0[n[it]];
						for (var et = 0, rt = 0, ot = 0, nt = 0, st = 0, it = 0; it < j; it++) et += q[it] * tt[it]._$fL, rt += q[it] * tt[it]._$gL, ot += q[it] * tt[it]._$B0, nt += q[it] * tt[it]._$z0, st += q[it] * tt[it]._$qT;
						e._$Yr._$fL = et, e._$Yr._$gL = rt, e._$Yr._$B0 = ot, e._$Yr._$z0 = nt, e._$Yr._$qT = st
					}
					var _ = this._$Y0[n[0]];
					e._$Yr.reflectX = _.reflectX, e._$Yr.reflectY = _.reflectY
				}
			}, z.prototype._$2b = function(t, i) {
				this != i._$GT() && console.log("### assert!! ### ");
				var e = i;
				if (e._$hS(!0), this._$32()) {
					var r = this.getTargetBaseDataID();
					if (e._$8r == I._$ur && (e._$8r = t.getBaseDataIndex(r)), e._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", r), e._$hS(!1);
					else {
						var o = t.getBaseData(e._$8r);
						if (null != o) {
							var n = t._$q2(e._$8r),
								s = z._$Xo;
							s[0] = e._$Yr._$fL, s[1] = e._$Yr._$gL;
							var a = z._$io;
							a[0] = 0, a[1] = -.1;
							n._$GT().getType() == I._$c2 ? a[1] = -10 : a[1] = -.1;
							var h = z._$0o;
							this._$Jr(t, o, n, s, a, h);
							var l = Lt._$92(a, h);
							o._$nb(t, n, s, s, 1, 0, 2), e._$Wr._$fL = s[0], e._$Wr._$gL = s[1], e._$Wr._$B0 = e._$Yr._$B0, e._$Wr._$z0 = e._$Yr._$z0, e._$Wr._$qT = e._$Yr._$qT - l * Lt._$NS;
							var $ = n.getTotalScale();
							e.setTotalScale_notForClient($ * e._$Wr._$B0);
							var u = n.getTotalOpacity();
							e.setTotalOpacity(u * e.getInterpolatedOpacity()), e._$Wr.reflectX = e._$Yr.reflectX, e._$Wr.reflectY = e._$Yr.reflectY, e._$hS(n._$yo())
						} else e._$hS(!1)
					}
				} else e.setTotalScale_notForClient(e._$Yr._$B0), e.setTotalOpacity(e.getInterpolatedOpacity())
			}, z.prototype._$nb = function(t, i, e, r, o, n, s) {
				this != i._$GT() && console.log("### assert!! ### ");
				for (var _, a, h = i, l = null != h._$Wr ? h._$Wr : h._$Yr, $ = Math.sin(Lt._$bS * l._$qT), u = Math.cos(Lt._$bS * l._$qT), p = h.getTotalScale(), f = l.reflectX ? -1 : 1, c = l.reflectY ? -1 : 1, d = u * p * f, g = -$ * p * c, y = $ * p * f, m = u * p * c, T = l._$fL, P = l._$gL, S = o * s, v = n; v < S; v += s) _ = e[v], a = e[v + 1], r[v] = d * _ + g * a + T, r[v + 1] = y * _ + m * a + P
			}, z.prototype._$Jr = function(t, i, e, r, o, n) {
				i != e._$GT() && console.log("### assert!! ### ");
				var s = z._$Lo;
				z._$Lo[0] = r[0], z._$Lo[1] = r[1], i._$nb(t, e, s, s, 1, 0, 2);
				for (var _ = z._$To, a = z._$Po, h = 1, l = 0; l < 10; l++) {
					if (a[0] = r[0] + h * o[0], a[1] = r[1] + h * o[1], i._$nb(t, e, a, _, 1, 0, 2), _[0] -= s[0], _[1] -= s[1], 0 != _[0] || 0 != _[1]) return n[0] = _[0], void(n[1] = _[1]);
					if (a[0] = r[0] - h * o[0], a[1] = r[1] - h * o[1], i._$nb(t, e, a, _, 1, 0, 2), _[0] -= s[0], _[1] -= s[1], 0 != _[0] || 0 != _[1]) return _[0] = -_[0], _[0] = -_[0], n[0] = _[0], void(n[1] = _[1]);
					h *= .1
				}
				at._$so && console.log("_$L0 to transform _$SP\n")
			}, H.prototype = new _t, W.prototype = new M, W._$ur = -2, W._$ES = 500, W._$wb = 2, W._$8S = 3, W._$os = 4, W._$52 = W._$ES, W._$R2 = W._$ES, W._$Sb = function(t) {
				for (var i = t.length - 1; i >= 0; --i) {
					var e = t[i];
					e < W._$52 ? W._$52 = e : e > W._$R2 && (W._$R2 = e)
				}
			}, W._$or = function() {
				return W._$52
			}, W._$Pr = function() {
				return W._$R2
			}, W.prototype._$F0 = function(t) {
				this._$gP = t._$nP(), this._$dr = t._$nP(), this._$GS = t._$nP(), this._$qb = t._$6L(), this._$Lb = t._$cS(), this._$mS = t._$Tb(), t.getFormatVersion() >= G._$T7 ? (this.clipID = t._$nP(), this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null, W._$Sb(this._$Lb)
			}, W.prototype.getClipIDList = function() {
				return this.clipIDList
			}, W.prototype._$Nr = function(t, i) {
				if (i._$IS[0] = !1, i._$Us = v._$Z2(t, this._$GS, i._$IS, this._$Lb), at._$Zs);
				else if (i._$IS[0]) return;
				i._$7s = v._$br(t, this._$GS, i._$IS, this._$mS)
			}, W.prototype._$2b = function(t) {}, W.prototype.getDrawDataID = function() {
				return this._$gP
			}, W.prototype._$j2 = function(t) {
				this._$gP = t
			}, W.prototype.getOpacity = function(t, i) {
				return i._$7s
			}, W.prototype._$zS = function(t, i) {
				return i._$Us
			}, W.prototype.getTargetBaseDataID = function() {
				return this._$dr
			}, W.prototype._$gs = function(t) {
				this._$dr = t
			}, W.prototype._$32 = function() {
				return null != this._$dr && this._$dr != yt._$2o()
			}, W.prototype.getType = function() {}, j._$42 = 0, j.prototype._$1b = function() {
				return this._$3S
			}, j.prototype.getDrawDataList = function() {
				return this._$aS
			}, j.prototype._$F0 = function(t) {
				this._$NL = t._$nP(), this._$aS = t._$nP(), this._$3S = t._$nP()
			}, j.prototype._$kr = function(t) {
				t._$Zo(this._$3S), t._$xo(this._$aS), this._$3S = null, this._$aS = null
			}, q.prototype = new i, q.loadModel = function(t) {
				var e = new q;
				return i._$62(e, t), e
			}, q.loadModel = function(t) {
				var e = new q;
				return i._$62(e, t), e
			}, q._$to = function() {
				return new q
			}, q._$er = function(t) {
				var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
				if (0 == i.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
				for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = q.loadModel(i._$3b()), o = 0; o < e.length; o++) {
					var n = new _$5(e[o]);
					if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
					r.setTexture(o, _$nL._$_o(t, n._$3b()))
				}
				return r
			}, q.prototype.setGL = function(t) {
				this._$zo.setGL(t)
			}, q.prototype.setTransform = function(t) {
				this._$zo.setTransform(t)
			}, q.prototype.draw = function() {
				this._$5S.draw(this._$zo)
			}, q.prototype._$K2 = function() {
				this._$zo._$K2()
			}, q.prototype.setTexture = function(t, i) {
				null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, i)
			}, q.prototype.setTexture = function(t, i) {
				null == this._$zo && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this._$zo.setTexture(t, i)
			}, q.prototype._$Rs = function() {
				return this._$zo._$Rs()
			}, q.prototype._$Ds = function(t) {
				this._$zo._$Ds(t)
			}, q.prototype.getDrawParam = function() {
				return this._$zo
			}, J.prototype = new s, J._$cs = "VISIBLE:", J._$ar = "LAYOUT:", J.MTN_PREFIX_FADEIN = "FADEIN:", J.MTN_PREFIX_FADEOUT = "FADEOUT:", J._$Co = 0, J._$1T = 1, J.loadMotion = function(t) {
				var i = k._$C(t);
				return J.loadMotion(i)
			}, J.loadMotion = function(t) {
				t instanceof ArrayBuffer && (t = new DataView(t));
				var i = new J,
					e = [0],
					r = t.byteLength;
				i._$yT = 0;
				for (var o = 0; o < r; ++o) {
					var n = Q(t, o),
						s = n.charCodeAt(0);
					if ("\n" != n && "\r" != n)
						if ("#" != n)
							if ("$" != n) {
								if (97 <= s && s <= 122 || 65 <= s && s <= 90 || "_" == n) {
									for (var _ = o, a = -1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o)
										if ("=" == n) {
											a = o;
											break
										} if (a >= 0) {
										var h = new B;
										O.startsWith(t, _, J._$cs) ? (h._$RP = B._$hs, h._$4P = O.createString(t, _, a - _)) : O.startsWith(t, _, J._$ar) ? (h._$4P = O.createString(t, _ + 7, a - _ - 7), O.startsWith(t, _ + 7, "ANCHOR_X") ? h._$RP = B._$xs : O.startsWith(t, _ + 7, "ANCHOR_Y") ? h._$RP = B._$us : O.startsWith(t, _ + 7, "SCALE_X") ? h._$RP = B._$qs : O.startsWith(t, _ + 7, "SCALE_Y") ? h._$RP = B._$Ys : O.startsWith(t, _ + 7, "X") ? h._$RP = B._$ws : O.startsWith(t, _ + 7, "Y") && (h._$RP = B._$Ns)) : (h._$RP = B._$Fr, h._$4P = O.createString(t, _, a - _)), i.motions.push(h);
										var l = 0,
											$ = [];
										for (o = a + 1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o)
											if ("," != n && " " != n && "\t" != n) {
												var u = O._$LS(t, r, o, e);
												if (e[0] > 0) {
													$.push(u), l++;
													var p = e[0];
													if (p < o) {
														console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
														break
													}
													o = p - 1
												}
											} h._$I0 = new Float32Array($), l > i._$yT && (i._$yT = l)
									}
								}
							} else {
								for (var _ = o, a = -1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o)
									if ("=" == n) {
										a = o;
										break
									} var f = !1;
								if (a >= 0)
									for (a == _ + 4 && "f" == Q(t, _ + 1) && "p" == Q(t, _ + 2) && "s" == Q(t, _ + 3) && (f = !0), o = a + 1; o < r && ("\r" != (n = Q(t, o)) && "\n" != n); ++o)
										if ("," != n && " " != n && "\t" != n) {
											var u = O._$LS(t, r, o, e);
											e[0] > 0 && f && 5 < u && u < 121 && (i._$D0 = u), o = e[0]
										} for (; o < r && ("\n" != Q(t, o) && "\r" != Q(t, o)); ++o);
							}
					else
						for (; o < r && ("\n" != Q(t, o) && "\r" != Q(t, o)); ++o);
				}
				return i._$rr = 1e3 * i._$yT / i._$D0 | 0, i
			}, J.prototype.getDurationMSec = function() {
				return this._$E ? -1 : this._$rr
			}, J.prototype.getLoopDurationMSec = function() {
				return this._$rr
			}, J.prototype.dump = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t];
					console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
					for (var e = 0; e < i._$I0.length && e < 10; e++) console.log("%5.2f ,", i._$I0[e]);
					console.log("\n")
				}
			}, J.prototype.updateParamExe = function(t, i, e, r) {
				for (var o = i - r._$z2, n = o * this._$D0 / 1e3, s = 0 | n, _ = n - s, a = 0; a < this.motions.length; a++) {
					var h = this.motions[a],
						l = h._$I0.length,
						$ = h._$4P;
					if (h._$RP == B._$hs) {
						var u = h._$I0[s >= l ? l - 1 : s];
						t.setParamFloat($, u)
					} else if (B._$ws <= h._$RP && h._$RP <= B._$Ys);
					else {
						var p, f = t.getParamIndex($),
							c = t.getModelContext(),
							d = c.getParamMax(f),
							g = c.getParamMin(f),
							y = .4 * (d - g),
							m = c.getParamFloat(f),
							T = h._$I0[s >= l ? l - 1 : s],
							P = h._$I0[s + 1 >= l ? l - 1 : s + 1];
						p = T < P && P - T > y || T > P && T - P > y ? T : T + (P - T) * _;
						var S = m + (p - m) * e;
						t.setParamFloat($, S)
					}
				}
				s >= this._$yT && (this._$E ? (r._$z2 = i, this.loopFadeIn && (r._$bs = i)) : r._$9L = !0), this._$eP = e
			}, J.prototype._$r0 = function() {
				return this._$E
			}, J.prototype._$aL = function(t) {
				this._$E = t
			}, J.prototype._$S0 = function() {
				return this._$D0
			}, J.prototype._$U0 = function(t) {
				this._$D0 = t
			}, J.prototype.isLoopFadeIn = function() {
				return this.loopFadeIn
			}, J.prototype.setLoopFadeIn = function(t) {
				this.loopFadeIn = t
			}, N.prototype.clear = function() {
				this.size = 0
			}, N.prototype.add = function(t) {
				if (this._$P.length <= this.size) {
					var i = new Float32Array(2 * this.size);
					w._$jT(this._$P, 0, i, 0, this.size), this._$P = i
				}
				this._$P[this.size++] = t
			}, N.prototype._$BL = function() {
				var t = new Float32Array(this.size);
				return w._$jT(this._$P, 0, t, 0, this.size), t
			}, B._$Fr = 0, B._$hs = 1, B._$ws = 100, B._$Ns = 101, B._$xs = 102, B._$us = 103, B._$qs = 104, B._$Ys = 105, Z.prototype = new I, Z._$gT = new Array, Z.prototype._$zP = function() {
				this._$GS = new D, this._$GS._$zP()
			}, Z.prototype._$F0 = function(t) {
				I.prototype._$F0.call(this, t), this._$A = t._$6L(), this._$o = t._$6L(), this._$GS = t._$nP(), this._$Eo = t._$nP(), I.prototype.readV2_opacity.call(this, t)
			}, Z.prototype.init = function(t) {
				var i = new K(this),
					e = (this._$o + 1) * (this._$A + 1);
				return null != i._$Cr && (i._$Cr = null), i._$Cr = new Float32Array(2 * e), null != i._$hr && (i._$hr = null), this._$32() ? i._$hr = new Float32Array(2 * e) : i._$hr = null, i
			}, Z.prototype._$Nr = function(t, i) {
				var e = i;
				if (this._$GS._$Ur(t)) {
					var r = this._$VT(),
						o = Z._$gT;
					o[0] = !1, v._$Vr(t, this._$GS, o, r, this._$Eo, e._$Cr, 0, 2), i._$Ib(o[0]), this.interpolateOpacity(t, this._$GS, i, o)
				}
			}, Z.prototype._$2b = function(t, i) {
				var e = i;
				if (e._$hS(!0), this._$32()) {
					var r = this.getTargetBaseDataID();
					if (e._$8r == I._$ur && (e._$8r = t.getBaseDataIndex(r)), e._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", r), e._$hS(!1);
					else {
						var o = t.getBaseData(e._$8r),
							n = t._$q2(e._$8r);
						if (null != o && n._$yo()) {
							var s = n.getTotalScale();
							e.setTotalScale_notForClient(s);
							var a = n.getTotalOpacity();
							e.setTotalOpacity(a * e.getInterpolatedOpacity()), o._$nb(t, n, e._$Cr, e._$hr, this._$VT(), 0, 2), e._$hS(!0)
						} else e._$hS(!1)
					}
				} else e.setTotalOpacity(e.getInterpolatedOpacity())
			}, Z.prototype._$nb = function(t, i, e, r, o, n, s) {
				var _ = i,
					a = null != _._$hr ? _._$hr : _._$Cr;
				Z.transformPoints_sdk2(e, r, o, n, s, a, this._$o, this._$A)
			}, Z.transformPoints_sdk2 = function(i, e, r, o, n, s, _, a) {
				for (var h, l, $, u = r * n, p = 0, f = 0, c = 0, d = 0, g = 0, y = 0, m = !1, T = o; T < u; T += n) {
					var P, S, v, L;
					if (v = i[T], L = i[T + 1], P = v * _, S = L * a, P < 0 || S < 0 || _ <= P || a <= S) {
						var M = _ + 1;
						if (!m) {
							m = !0, p = .25 * (s[2 * (0 + 0 * M)] + s[2 * (_ + 0 * M)] + s[2 * (0 + a * M)] + s[2 * (_ + a * M)]), f = .25 * (s[2 * (0 + 0 * M) + 1] + s[2 * (_ + 0 * M) + 1] + s[2 * (0 + a * M) + 1] + s[2 * (_ + a * M) + 1]);
							var E = s[2 * (_ + a * M)] - s[2 * (0 + 0 * M)],
								A = s[2 * (_ + a * M) + 1] - s[2 * (0 + 0 * M) + 1],
								I = s[2 * (_ + 0 * M)] - s[2 * (0 + a * M)],
								w = s[2 * (_ + 0 * M) + 1] - s[2 * (0 + a * M) + 1];
							c = .5 * (E + I), d = .5 * (A + w), g = .5 * (E - I), y = .5 * (A - w), p -= .5 * (c + g), f -= .5 * (d + y)
						}
						if (-2 < v && v < 3 && -2 < L && L < 3)
							if (v <= 0)
								if (L <= 0) {
									var x = s[2 * (0 + 0 * M)],
										O = s[2 * (0 + 0 * M) + 1],
										D = p - 2 * c,
										R = f - 2 * d,
										b = p - 2 * g,
										F = f - 2 * y,
										C = p - 2 * c - 2 * g,
										N = f - 2 * d - 2 * y,
										B = .5 * (v - -2),
										U = .5 * (L - -2);
									B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
								} else if (L >= 1) {
							var b = s[2 * (0 + a * M)],
								F = s[2 * (0 + a * M) + 1],
								C = p - 2 * c + 1 * g,
								N = f - 2 * d + 1 * y,
								x = p + 3 * g,
								O = f + 3 * y,
								D = p - 2 * c + 3 * g,
								R = f - 2 * d + 3 * y,
								B = .5 * (v - -2),
								U = .5 * (L - 1);
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else {
							var G = 0 | S;
							G == a && (G = a - 1);
							var B = .5 * (v - -2),
								U = S - G,
								Y = G / a,
								k = (G + 1) / a,
								b = s[2 * (0 + G * M)],
								F = s[2 * (0 + G * M) + 1],
								x = s[2 * (0 + (G + 1) * M)],
								O = s[2 * (0 + (G + 1) * M) + 1],
								C = p - 2 * c + Y * g,
								N = f - 2 * d + Y * y,
								D = p - 2 * c + k * g,
								R = f - 2 * d + k * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (1 <= v)
							if (L <= 0) {
								var D = s[2 * (_ + 0 * M)],
									R = s[2 * (_ + 0 * M) + 1],
									x = p + 3 * c,
									O = f + 3 * d,
									C = p + 1 * c - 2 * g,
									N = f + 1 * d - 2 * y,
									b = p + 3 * c - 2 * g,
									F = f + 3 * d - 2 * y,
									B = .5 * (v - 1),
									U = .5 * (L - -2);
								B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
							} else if (L >= 1) {
							var C = s[2 * (_ + a * M)],
								N = s[2 * (_ + a * M) + 1],
								b = p + 3 * c + 1 * g,
								F = f + 3 * d + 1 * y,
								D = p + 1 * c + 3 * g,
								R = f + 1 * d + 3 * y,
								x = p + 3 * c + 3 * g,
								O = f + 3 * d + 3 * y,
								B = .5 * (v - 1),
								U = .5 * (L - 1);
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else {
							var G = 0 | S;
							G == a && (G = a - 1);
							var B = .5 * (v - 1),
								U = S - G,
								Y = G / a,
								k = (G + 1) / a,
								C = s[2 * (_ + G * M)],
								N = s[2 * (_ + G * M) + 1],
								D = s[2 * (_ + (G + 1) * M)],
								R = s[2 * (_ + (G + 1) * M) + 1],
								b = p + 3 * c + Y * g,
								F = f + 3 * d + Y * y,
								x = p + 3 * c + k * g,
								O = f + 3 * d + k * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (L <= 0) {
							var V = 0 | P;
							V == _ && (V = _ - 1);
							var B = P - V,
								U = .5 * (L - -2),
								X = V / _,
								z = (V + 1) / _,
								D = s[2 * (V + 0 * M)],
								R = s[2 * (V + 0 * M) + 1],
								x = s[2 * (V + 1 + 0 * M)],
								O = s[2 * (V + 1 + 0 * M) + 1],
								C = p + X * c - 2 * g,
								N = f + X * d - 2 * y,
								b = p + z * c - 2 * g,
								F = f + z * d - 2 * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else if (L >= 1) {
							var V = 0 | P;
							V == _ && (V = _ - 1);
							var B = P - V,
								U = .5 * (L - 1),
								X = V / _,
								z = (V + 1) / _,
								C = s[2 * (V + a * M)],
								N = s[2 * (V + a * M) + 1],
								b = s[2 * (V + 1 + a * M)],
								F = s[2 * (V + 1 + a * M) + 1],
								D = p + X * c + 3 * g,
								R = f + X * d + 3 * y,
								x = p + z * c + 3 * g,
								O = f + z * d + 3 * y;
							B + U <= 1 ? (e[T] = C + (b - C) * B + (D - C) * U, e[T + 1] = N + (F - N) * B + (R - N) * U) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - U), e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - U))
						} else t.err.printf("_$li calc : %.4f , %.4f\t\t\t\t\t@@BDBoxGrid\n", v, L);
						else e[T] = p + v * c + L * g, e[T + 1] = f + v * d + L * y
					} else l = P - (0 | P), $ = S - (0 | S), h = 2 * ((0 | P) + (0 | S) * (_ + 1)), l + $ < 1 ? (e[T] = s[h] * (1 - l - $) + s[h + 2] * l + s[h + 2 * (_ + 1)] * $, e[T + 1] = s[h + 1] * (1 - l - $) + s[h + 3] * l + s[h + 2 * (_ + 1) + 1] * $) : (e[T] = s[h + 2 * (_ + 1) + 2] * (l - 1 + $) + s[h + 2 * (_ + 1)] * (1 - l) + s[h + 2] * (1 - $), e[T + 1] = s[h + 2 * (_ + 1) + 3] * (l - 1 + $) + s[h + 2 * (_ + 1) + 1] * (1 - l) + s[h + 3] * (1 - $))
				}
			}, Z.prototype.transformPoints_sdk1 = function(t, i, e, r, o, n, s) {
				for (var _, a, h, l, $, u, p, f = i, c = this._$o, d = this._$A, g = o * s, y = null != f._$hr ? f._$hr : f._$Cr, m = n; m < g; m += s) at._$ts ? (_ = e[m], a = e[m + 1], _ < 0 ? _ = 0 : _ > 1 && (_ = 1), a < 0 ? a = 0 : a > 1 && (a = 1), _ *= c, a *= d, h = 0 | _, l = 0 | a, h > c - 1 && (h = c - 1), l > d - 1 && (l = d - 1), u = _ - h, p = a - l, $ = 2 * (h + l * (c + 1))) : (_ = e[m] * c, a = e[m + 1] * d, u = _ - (0 | _), p = a - (0 | a), $ = 2 * ((0 | _) + (0 | a) * (c + 1))), u + p < 1 ? (r[m] = y[$] * (1 - u - p) + y[$ + 2] * u + y[$ + 2 * (c + 1)] * p, r[m + 1] = y[$ + 1] * (1 - u - p) + y[$ + 3] * u + y[$ + 2 * (c + 1) + 1] * p) : (r[m] = y[$ + 2 * (c + 1) + 2] * (u - 1 + p) + y[$ + 2 * (c + 1)] * (1 - u) + y[$ + 2] * (1 - p), r[m + 1] = y[$ + 2 * (c + 1) + 3] * (u - 1 + p) + y[$ + 2 * (c + 1) + 1] * (1 - u) + y[$ + 3] * (1 - p))
			}, Z.prototype._$VT = function() {
				return (this._$o + 1) * (this._$A + 1)
			}, Z.prototype.getType = function() {
				return I._$_b
			}, K.prototype = new _t, tt._$42 = 0, tt.prototype._$zP = function() {
				this._$3S = new Array, this._$aS = new Array
			}, tt.prototype._$F0 = function(t) {
				this._$g0 = t._$8L(), this.visible = t._$8L(), this._$NL = t._$nP(), this._$3S = t._$nP(), this._$aS = t._$nP()
			}, tt.prototype.init = function(t) {
				var i = new it(this);
				return i.setPartsOpacity(this.isVisible() ? 1 : 0), i
			}, tt.prototype._$6o = function(t) {
				if (null == this._$3S) throw new Error("_$3S _$6 _$Wo@_$6o");
				this._$3S.push(t)
			}, tt.prototype._$3o = function(t) {
				if (null == this._$aS) throw new Error("_$aS _$6 _$Wo@_$3o");
				this._$aS.push(t)
			}, tt.prototype._$Zo = function(t) {
				this._$3S = t
			}, tt.prototype._$xo = function(t) {
				this._$aS = t
			}, tt.prototype.isVisible = function() {
				return this.visible
			}, tt.prototype._$uL = function() {
				return this._$g0
			}, tt.prototype._$KP = function(t) {
				this.visible = t
			}, tt.prototype._$ET = function(t) {
				this._$g0 = t
			}, tt.prototype.getBaseData = function() {
				return this._$3S
			}, tt.prototype.getDrawData = function() {
				return this._$aS
			}, tt.prototype._$p2 = function() {
				return this._$NL
			}, tt.prototype._$ob = function(t) {
				this._$NL = t
			}, tt.prototype.getPartsID = function() {
				return this._$NL
			}, tt.prototype._$MP = function(t) {
				this._$NL = t
			}, it.prototype = new $, it.prototype.getPartsOpacity = function() {
				return this._$VS
			}, it.prototype.setPartsOpacity = function(t) {
				this._$VS = t
			}, et._$L7 = function() {
				u._$27(), yt._$27(), b._$27(), l._$27()
			}, et.prototype.toString = function() {
				return this.id
			}, rt.prototype._$F0 = function(t) {}, ot.prototype._$1s = function() {
				return this._$4S
			}, ot.prototype._$zP = function() {
				this._$4S = new Array
			}, ot.prototype._$F0 = function(t) {
				this._$4S = t._$nP()
			}, ot.prototype._$Ks = function(t) {
				this._$4S.push(t)
			}, nt.tr = new gt, nt._$50 = new gt, nt._$Ti = new Array(0, 0), nt._$Pi = new Array(0, 0), nt._$B = new Array(0, 0), nt.prototype._$lP = function(t, i, e, r) {
				this.viewport = new Array(t, i, e, r)
			}, nt.prototype._$bL = function() {
				this.context.save();
				var t = this.viewport;
				null != t && (this.context.beginPath(), this.context._$Li(t[0], t[1], t[2], t[3]), this.context.clip())
			}, nt.prototype._$ei = function() {
				this.context.restore()
			}, nt.prototype.drawElements = function(t, i, e, r, o, n, s, a) {
				try {
					o != this._$Qo && (this._$Qo = o, this.context.globalAlpha = o);
					for (var h = i.length, l = t.width, $ = t.height, u = this.context, p = this._$xP, f = this._$uP, c = this._$6r, d = this._$3r, g = nt.tr, y = nt._$Ti, m = nt._$Pi, T = nt._$B, P = 0; P < h; P += 3) {
						u.save();
						var S = i[P],
							v = i[P + 1],
							L = i[P + 2],
							M = p + c * e[2 * S],
							E = f + d * e[2 * S + 1],
							A = p + c * e[2 * v],
							I = f + d * e[2 * v + 1],
							w = p + c * e[2 * L],
							x = f + d * e[2 * L + 1];
						s && (s._$PS(M, E, T), M = T[0], E = T[1], s._$PS(A, I, T), A = T[0], I = T[1], s._$PS(w, x, T), w = T[0], x = T[1]);
						var O = l * r[2 * S],
							D = $ - $ * r[2 * S + 1],
							R = l * r[2 * v],
							b = $ - $ * r[2 * v + 1],
							F = l * r[2 * L],
							C = $ - $ * r[2 * L + 1],
							N = Math.atan2(b - D, R - O),
							B = Math.atan2(I - E, A - M),
							U = A - M,
							G = I - E,
							Y = Math.sqrt(U * U + G * G),
							k = R - O,
							V = b - D,
							X = Math.sqrt(k * k + V * V),
							z = Y / X;
						It._$ni(F, C, O, D, R - O, b - D, -(b - D), R - O, y), It._$ni(w, x, M, E, A - M, I - E, -(I - E), A - M, m);
						var H = (m[0] - y[0]) / y[1],
							W = Math.min(O, R, F),
							j = Math.max(O, R, F),
							q = Math.min(D, b, C),
							J = Math.max(D, b, C),
							Q = Math.floor(W),
							Z = Math.floor(q),
							K = Math.ceil(j),
							tt = Math.ceil(J);
						g.identity(), g.translate(M, E), g.rotate(B), g.scale(1, m[1] / y[1]), g.shear(H, 0), g.scale(z, z), g.rotate(-N), g.translate(-O, -D), g.setContext(u);
						if (n || (n = 1.2), at.IGNORE_EXPAND && (n = 0), at.USE_CACHED_POLYGON_IMAGE) {
							var it = a._$e0;
							if (it.gl_cacheImage = it.gl_cacheImage || {}, !it.gl_cacheImage[P]) {
								var et = nt.createCanvas(K - Q, tt - Z);
								at.DEBUG_DATA.LDGL_CANVAS_MB = at.DEBUG_DATA.LDGL_CANVAS_MB || 0, at.DEBUG_DATA.LDGL_CANVAS_MB += (K - Q) * (tt - Z) * 4;
								var rt = et.getContext("2d");
								rt.translate(-Q, -Z), nt.clip(rt, g, n, Y, O, D, R, b, F, C, M, E, A, I, w, x), rt.drawImage(t, 0, 0), it.gl_cacheImage[P] = {
									cacheCanvas: et,
									cacheContext: rt
								}
							}
							u.drawImage(it.gl_cacheImage[P].cacheCanvas, Q, Z)
						} else at.IGNORE_CLIP || nt.clip(u, g, n, Y, O, D, R, b, F, C, M, E, A, I, w, x), at.USE_ADJUST_TRANSLATION && (W = 0, j = l, q = 0, J = $), u.drawImage(t, W, q, j - W, J - q, W, q, j - W, J - q);
						u.restore()
					}
				} catch (t) {
					_._$Rb(t)
				}
			}, nt.clip = function(t, i, e, r, o, n, s, _, a, h, l, $, u, p, f, c) {
				e > .02 ? nt.expandClip(t, i, e, r, l, $, u, p, f, c) : nt.clipWithTransform(t, null, o, n, s, _, a, h)
			}, nt.expandClip = function(t, i, e, r, o, n, s, _, a, h) {
				var l = s - o,
					$ = _ - n,
					u = a - o,
					p = h - n,
					f = l * p - $ * u > 0 ? e : -e,
					c = -$,
					d = l,
					g = a - s,
					y = h - _,
					m = -y,
					T = g,
					P = Math.sqrt(g * g + y * y),
					S = -p,
					v = u,
					L = Math.sqrt(u * u + p * p),
					M = o - f * c / r,
					E = n - f * d / r,
					A = s - f * c / r,
					I = _ - f * d / r,
					w = s - f * m / P,
					x = _ - f * T / P,
					O = a - f * m / P,
					D = h - f * T / P,
					R = o + f * S / L,
					b = n + f * v / L,
					F = a + f * S / L,
					C = h + f * v / L,
					N = nt._$50;
				return null != i._$P2(N) && (nt.clipWithTransform(t, N, M, E, A, I, w, x, O, D, F, C, R, b), !0)
			}, nt.clipWithTransform = function(t, i, e, r, o, n, s, a) {
				if (arguments.length < 7) return void _._$li("err : @LDGL.clip()");
				if (!(arguments[1] instanceof gt)) return void _._$li("err : a[0] is _$6 LDTransform @LDGL.clip()");
				var h = nt._$B,
					l = i,
					$ = arguments;
				if (t.beginPath(), l) {
					l._$PS($[2], $[3], h), t.moveTo(h[0], h[1]);
					for (var u = 4; u < $.length; u += 2) l._$PS($[u], $[u + 1], h), t.lineTo(h[0], h[1])
				} else {
					t.moveTo($[2], $[3]);
					for (var u = 4; u < $.length; u += 2) t.lineTo($[u], $[u + 1])
				}
				t.clip()
			}, nt.createCanvas = function(t, i) {
				var e = document.createElement("canvas");
				return e.setAttribute("width", t), e.setAttribute("height", i), e || _._$li("err : " + e), e
			}, nt.dumpValues = function() {
				for (var t = "", i = 0; i < arguments.length; i++) t += "[" + i + "]= " + arguments[i].toFixed(3) + " , ";
				console.log(t)
			}, st.prototype._$F0 = function(t) {
				this._$TT = t._$_T(), this._$LT = t._$_T(), this._$FS = t._$_T(), this._$wL = t._$nP()
			}, st.prototype.getMinValue = function() {
				return this._$TT
			}, st.prototype.getMaxValue = function() {
				return this._$LT
			}, st.prototype.getDefaultValue = function() {
				return this._$FS
			}, st.prototype.getParamID = function() {
				return this._$wL
			}, _t.prototype._$yo = function() {
				return this._$AT && !this._$JS
			}, _t.prototype._$hS = function(t) {
				this._$AT = t
			}, _t.prototype._$GT = function() {
				return this._$e0
			}, _t.prototype._$l2 = function(t) {
				this._$IP = t
			}, _t.prototype.getPartsIndex = function() {
				return this._$IP
			}, _t.prototype._$x2 = function() {
				return this._$JS
			}, _t.prototype._$Ib = function(t) {
				this._$JS = t
			}, _t.prototype.getTotalScale = function() {
				return this.totalScale
			}, _t.prototype.setTotalScale_notForClient = function(t) {
				this.totalScale = t
			}, _t.prototype.getInterpolatedOpacity = function() {
				return this._$7s
			}, _t.prototype.setInterpolatedOpacity = function(t) {
				this._$7s = t
			}, _t.prototype.getTotalOpacity = function(t) {
				return this.totalOpacity
			}, _t.prototype.setTotalOpacity = function(t) {
				this.totalOpacity = t
			}, at._$2s = "2.1.00_1", at._$Kr = 201001e3, at._$sP = !0, at._$so = !0, at._$cb = !1, at._$3T = !0, at._$Ts = !0, at._$fb = !0, at._$ts = !0, at.L2D_DEFORMER_EXTEND = !0, at._$Wb = !1;
			at._$yr = !1, at._$Zs = !1, at.L2D_NO_ERROR = 0, at._$i7 = 1e3, at._$9s = 1001, at._$es = 1100, at._$r7 = 2e3, at._$07 = 2001, at._$b7 = 2002, at._$H7 = 4e3, at.L2D_COLOR_BLEND_MODE_MULT = 0, at.L2D_COLOR_BLEND_MODE_ADD = 1, at.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2, at._$6b = !0, at._$cT = 0, at.clippingMaskBufferSize = 256, at.glContext = new Array, at.frameBuffers = new Array, at.fTexture = new Array, at.IGNORE_CLIP = !1, at.IGNORE_EXPAND = !1, at.EXPAND_W = 2, at.USE_ADJUST_TRANSLATION = !0, at.USE_CANVAS_TRANSFORM = !0, at.USE_CACHED_POLYGON_IMAGE = !1, at.DEBUG_DATA = {}, at.PROFILE_IOS_SPEED = {
				PROFILE_NAME: "iOS Speed",
				USE_ADJUST_TRANSLATION: !0,
				USE_CACHED_POLYGON_IMAGE: !0,
				EXPAND_W: 4
			}, at.PROFILE_IOS_QUALITY = {
				PROFILE_NAME: "iOS HiQ",
				USE_ADJUST_TRANSLATION: !0,
				USE_CACHED_POLYGON_IMAGE: !1,
				EXPAND_W: 2
			}, at.PROFILE_IOS_DEFAULT = at.PROFILE_IOS_QUALITY, at.PROFILE_ANDROID = {
				PROFILE_NAME: "Android",
				USE_ADJUST_TRANSLATION: !1,
				USE_CACHED_POLYGON_IMAGE: !1,
				EXPAND_W: 2
			}, at.PROFILE_DESKTOP = {
				PROFILE_NAME: "Desktop",
				USE_ADJUST_TRANSLATION: !1,
				USE_CACHED_POLYGON_IMAGE: !1,
				EXPAND_W: 2
			}, at.initProfile = function() {
				Et.isIOS() ? at.setupProfile(at.PROFILE_IOS_DEFAULT) : Et.isAndroid() ? at.setupProfile(at.PROFILE_ANDROID) : at.setupProfile(at.PROFILE_DESKTOP)
			}, at.setupProfile = function(t, i) {
				if ("number" == typeof t) switch (t) {
					case 9901:
						t = at.PROFILE_IOS_SPEED;
						break;
					case 9902:
						t = at.PROFILE_IOS_QUALITY;
						break;
					case 9903:
						t = at.PROFILE_IOS_DEFAULT;
						break;
					case 9904:
						t = at.PROFILE_ANDROID;
						break;
					case 9905:
						t = at.PROFILE_DESKTOP;
						break;
					default:
						alert("profile _$6 _$Ui : " + t)
				}
				arguments.length < 2 && (i = !0), i && console.log("profile : " + t.PROFILE_NAME);
				for (var e in t) at[e] = t[e], i && console.log("  [" + e + "] = " + t[e])
			}, at.init = function() {
				if (at._$6b) {
					console.log("Live2D %s", at._$2s), at._$6b = !1;
					!0, at.initProfile()
				}
			}, at.getVersionStr = function() {
				return at._$2s
			}, at.getVersionNo = function() {
				return at._$Kr
			}, at._$sT = function(t) {
				at._$cT = t
			}, at.getError = function() {
				var t = at._$cT;
				return at._$cT = 0, t
			}, at.dispose = function() {
				at.glContext = [], at.frameBuffers = [], at.fTexture = []
			}, at.setGL = function(t, i) {
				var e = i || 0;
				at.glContext[e] = t
			}, at.getGL = function(t) {
				return at.glContext[t]
			}, at.setClippingMaskBufferSize = function(t) {
				at.clippingMaskBufferSize = t
			}, at.getClippingMaskBufferSize = function() {
				return at.clippingMaskBufferSize
			}, at.deleteBuffer = function(t) {
				at.getGL(t).deleteFramebuffer(at.frameBuffers[t].framebuffer), delete at.frameBuffers[t], delete at.glContext[t]
			}, ht._$r2 = function(t) {
				return t < 0 ? 0 : t > 1 ? 1 : .5 - .5 * Math.cos(t * Lt.PI_F)
			}, lt._$fr = -1, lt.prototype.toString = function() {
				return this._$ib
			}, $t.prototype = new W, $t._$42 = 0, $t._$Os = 30, $t._$ms = 0, $t._$ns = 1, $t._$_s = 2, $t._$gT = new Array, $t.prototype._$_S = function(t) {
				this._$LP = t
			}, $t.prototype.getTextureNo = function() {
				return this._$LP
			}, $t.prototype._$ZL = function() {
				return this._$Qi
			}, $t.prototype._$H2 = function() {
				return this._$JP
			}, $t.prototype.getNumPoints = function() {
				return this._$d0
			}, $t.prototype.getType = function() {
				return W._$wb
			}, $t.prototype._$B2 = function(t, i, e) {
				var r = i,
					o = null != r._$hr ? r._$hr : r._$Cr;
				switch (U._$do) {
					default:
					case U._$Ms:
						throw new Error("_$L _$ro ");
					case U._$Qs:
						for (var n = this._$d0 - 1; n >= 0; --n) o[n * U._$No + 4] = e
				}
			}, $t.prototype._$zP = function() {
				this._$GS = new D, this._$GS._$zP()
			}, $t.prototype._$F0 = function(t) {
				W.prototype._$F0.call(this, t), this._$LP = t._$6L(), this._$d0 = t._$6L(), this._$Yo = t._$6L();
				var i = t._$nP();
				this._$BP = new Int16Array(3 * this._$Yo);
				for (var e = 3 * this._$Yo - 1; e >= 0; --e) this._$BP[e] = i[e];
				if (this._$Eo = t._$nP(), this._$Qi = t._$nP(), t.getFormatVersion() >= G._$s7) {
					if (this._$JP = t._$6L(), 0 != this._$JP) {
						if (0 != (1 & this._$JP)) {
							var r = t._$6L();
							null == this._$5P && (this._$5P = new Object), this._$5P._$Hb = parseInt(r)
						}
						0 != (this._$JP & $t._$Os) ? this._$6s = (this._$JP & $t._$Os) >> 1 : this._$6s = $t._$ms, 0 != (32 & this._$JP) && (this.culling = !1)
					}
				} else this._$JP = 0
			}, $t.prototype.init = function(t) {
				var i = new ut(this),
					e = this._$d0 * U._$No,
					r = this._$32();
				switch (null != i._$Cr && (i._$Cr = null), i._$Cr = new Float32Array(e), null != i._$hr && (i._$hr = null), i._$hr = r ? new Float32Array(e) : null, U._$do) {
					default:
					case U._$Ms:
						if (U._$Ls)
							for (var o = this._$d0 - 1; o >= 0; --o) {
								var n = o << 1;
								this._$Qi[n + 1] = 1 - this._$Qi[n + 1]
							}
						break;
					case U._$Qs:
						for (var o = this._$d0 - 1; o >= 0; --o) {
							var n = o << 1,
								s = o * U._$No,
								_ = this._$Qi[n],
								a = this._$Qi[n + 1];
							i._$Cr[s] = _, i._$Cr[s + 1] = a, i._$Cr[s + 4] = 0, r && (i._$hr[s] = _, i._$hr[s + 1] = a, i._$hr[s + 4] = 0)
						}
				}
				return i
			}, $t.prototype._$Nr = function(t, i) {
				var e = i;
				if (this != e._$GT() && console.log("### assert!! ### "), this._$GS._$Ur(t) && (W.prototype._$Nr.call(this, t, e), !e._$IS[0])) {
					var r = $t._$gT;
					r[0] = !1, v._$Vr(t, this._$GS, r, this._$d0, this._$Eo, e._$Cr, U._$i2, U._$No)
				}
			}, $t.prototype._$2b = function(t, i) {
				try {
					this != i._$GT() && console.log("### assert!! ### ");
					var e = !1;
					i._$IS[0] && (e = !0);
					var r = i;
					if (!e && (W.prototype._$2b.call(this, t), this._$32())) {
						var o = this.getTargetBaseDataID();
						if (r._$8r == W._$ur && (r._$8r = t.getBaseDataIndex(o)), r._$8r < 0) at._$so && _._$li("_$L _$0P _$G :: %s", o);
						else {
							var n = t.getBaseData(r._$8r),
								s = t._$q2(r._$8r);
							null == n || s._$x2() ? r._$AT = !1 : (n._$nb(t, s, r._$Cr, r._$hr, this._$d0, U._$i2, U._$No), r._$AT = !0), r.baseOpacity = s.getTotalOpacity()
						}
					}
				} catch (t) {
					throw t
				}
			}, $t.prototype.draw = function(t, i, e) {
				if (this != e._$GT() && console.log("### assert!! ### "), !e._$IS[0]) {
					var r = e,
						o = this._$LP;
					o < 0 && (o = 1);
					var n = this.getOpacity(i, r) * e._$VS * e.baseOpacity,
						s = null != r._$hr ? r._$hr : r._$Cr;
					t.setClipBufPre_clipContextForDraw(e.clipBufPre_clipContext), t._$WP(this.culling), t._$Uo(o, 3 * this._$Yo, this._$BP, s, this._$Qi, n, this._$6s, r)
				}
			}, $t.prototype.dump = function() {
				console.log("  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) \n", this._$LP, this._$d0, this._$Yo), console.log("  _$Oi _$di = { ");
				for (var t = 0; t < this._$BP.length; t++) console.log("%5d ,", this._$BP[t]);
				console.log("\n  _$5i _$30");
				for (var t = 0; t < this._$Eo.length; t++) {
					console.log("\n    _$30[%d] = ", t);
					for (var i = this._$Eo[t], e = 0; e < i.length; e++) console.log("%6.2f, ", i[e])
				}
				console.log("\n")
			}, $t.prototype._$72 = function(t) {
				return null == this._$5P ? null : this._$5P[t]
			}, $t.prototype.getIndexArray = function() {
				return this._$BP
			}, ut.prototype = new Mt, ut.prototype.getTransformedPoints = function() {
				return null != this._$hr ? this._$hr : this._$Cr
			}, pt.prototype._$HT = function(t) {
				this.x = t.x, this.y = t.y
			}, pt.prototype._$HT = function(t, i) {
				this.x = t, this.y = i
			}, ft.prototype = new i, ft.loadModel = function(t) {
				var e = new ft;
				return i._$62(e, t), e
			}, ft.loadModel = function(t, e) {
				var r = e || 0,
					o = new ft(r);
				return i._$62(o, t), o
			}, ft._$to = function() {
				return new ft
			}, ft._$er = function(t) {
				var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
				if (0 == i.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
				for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = ft.loadModel(i._$3b()), o = 0; o < e.length; o++) {
					var n = new _$5(e[o]);
					if (0 == n.exists()) throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
					r.setTexture(o, _$nL._$_o(t, n._$3b()))
				}
				return r
			}, ft.prototype.setGL = function(t) {
				at.setGL(t)
			}, ft.prototype.setTransform = function(t) {
				this.drawParamWebGL.setTransform(t)
			}, ft.prototype.update = function() {
				this._$5S.update(), this._$5S.preDraw(this.drawParamWebGL)
			}, ft.prototype.draw = function() {
				this._$5S.draw(this.drawParamWebGL)
			}, ft.prototype._$K2 = function() {
				this.drawParamWebGL._$K2()
			}, ft.prototype.setTexture = function(t, i) {
				null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, i)
			}, ft.prototype.setTexture = function(t, i) {
				null == this.drawParamWebGL && _._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"), this.drawParamWebGL.setTexture(t, i)
			}, ft.prototype._$Rs = function() {
				return this.drawParamWebGL._$Rs()
			}, ft.prototype._$Ds = function(t) {
				this.drawParamWebGL._$Ds(t)
			}, ft.prototype.getDrawParam = function() {
				return this.drawParamWebGL
			}, ft.prototype.setMatrix = function(t) {
				this.drawParamWebGL.setMatrix(t)
			}, ft.prototype.setPremultipliedAlpha = function(t) {
				this.drawParamWebGL.setPremultipliedAlpha(t)
			}, ft.prototype.isPremultipliedAlpha = function() {
				return this.drawParamWebGL.isPremultipliedAlpha()
			}, ft.prototype.setAnisotropy = function(t) {
				this.drawParamWebGL.setAnisotropy(t)
			}, ft.prototype.getAnisotropy = function() {
				return this.drawParamWebGL.getAnisotropy()
			}, ct.prototype._$tb = function() {
				return this.motions
			}, ct.prototype.startMotion = function(t, i) {
				for (var e = null, r = this.motions.length, o = 0; o < r; ++o) null != (e = this.motions[o]) && (e._$qS(e._$w0.getFadeOut()), this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)\n", r, e._$sr));
				if (null == t) return -1;
				e = new dt, e._$w0 = t, this.motions.push(e);
				var n = e._$sr;
				return this._$eb && _._$Ji("MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)\n", r, n), n
			}, ct.prototype.updateParam = function(t) {
				try {
					for (var i = !1, e = 0; e < this.motions.length; e++) {
						var r = this.motions[e];
						if (null != r) {
							var o = r._$w0;
							null != o ? (o.updateParam(t, r), i = !0, r.isFinished() && (this._$eb && _._$Ji("MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)\n", this.motions.length - 1, r._$sr), this.motions.splice(e, 1), e--)) : (this.motions = this.motions.splice(e, 1), e--)
						} else this.motions.splice(e, 1), e--
					}
					return i
				} catch (t) {
					return _._$li(t), !0
				}
			}, ct.prototype.isFinished = function(t) {
				if (arguments.length >= 1) {
					for (var i = 0; i < this.motions.length; i++) {
						var e = this.motions[i];
						if (null != e && (e._$sr == t && !e.isFinished())) return !1
					}
					return !0
				}
				for (var i = 0; i < this.motions.length; i++) {
					var e = this.motions[i];
					if (null != e) {
						if (null != e._$w0) {
							if (!e.isFinished()) return !1
						} else this.motions.splice(i, 1), i--
					} else this.motions.splice(i, 1), i--
				}
				return !0
			}, ct.prototype.stopAllMotions = function() {
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t];
					if (null != i) {
						i._$w0;
						this.motions.splice(t, 1), t--
					} else this.motions.splice(t, 1), t--
				}
			}, ct.prototype._$Zr = function(t) {
				this._$eb = t
			}, ct.prototype._$e = function() {
				console.log("-- _$R --\n");
				for (var t = 0; t < this.motions.length; t++) {
					var i = this.motions[t],
						e = i._$w0;
					console.log("MotionQueueEnt[%d] :: %s\n", this.motions.length, e.toString())
				}
			}, dt._$Gs = 0, dt.prototype.isFinished = function() {
				return this._$9L
			}, dt.prototype._$qS = function(t) {
				var i = w.getUserTimeMSec(),
					e = i + t;
				(this._$Do < 0 || e < this._$Do) && (this._$Do = e)
			}, dt.prototype._$Bs = function() {
				return this._$sr
			}, gt.prototype.setContext = function(t) {
				var i = this.m;
				t.transform(i[0], i[1], i[3], i[4], i[6], i[7])
			}, gt.prototype.toString = function() {
				for (var t = "LDTransform { ", i = 0; i < 9; i++) t += this.m[i].toFixed(2) + " ,";
				return t += " }"
			}, gt.prototype.identity = function() {
				var t = this.m;
				t[0] = t[4] = t[8] = 1, t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0
			}, gt.prototype._$PS = function(t, i, e) {
				null == e && (e = new Array(0, 0));
				var r = this.m;
				return e[0] = r[0] * t + r[3] * i + r[6], e[1] = r[1] * t + r[4] * i + r[7], e
			}, gt.prototype._$P2 = function(t) {
				t || (t = new gt);
				var i = this.m,
					e = i[0],
					r = i[1],
					o = i[2],
					n = i[3],
					s = i[4],
					_ = i[5],
					a = i[6],
					h = i[7],
					l = i[8],
					$ = e * s * l + r * _ * a + o * n * h - e * _ * h - o * s * a - r * n * l;
				if (0 == $) return null;
				var u = 1 / $;
				return t.m[0] = u * (s * l - h * _), t.m[1] = u * (h * o - r * l), t.m[2] = u * (r * _ - s * o), t.m[3] = u * (a * _ - n * l), t.m[4] = u * (e * l - a * o), t.m[5] = u * (n * o - e * _), t.m[6] = u * (n * h - a * s), t.m[7] = u * (a * r - e * h), t.m[8] = u * (e * s - n * r), t
			}, gt.prototype.transform = function(t, i, e) {
				null == e && (e = new Array(0, 0));
				var r = this.m;
				return e[0] = r[0] * t + r[3] * i + r[6], e[1] = r[1] * t + r[4] * i + r[7], e
			}, gt.prototype.translate = function(t, i) {
				var e = this.m;
				e[6] = e[0] * t + e[3] * i + e[6], e[7] = e[1] * t + e[4] * i + e[7], e[8] = e[2] * t + e[5] * i + e[8]
			}, gt.prototype.scale = function(t, i) {
				var e = this.m;
				e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= i, e[4] *= i, e[5] *= i
			}, gt.prototype.shear = function(t, i) {
				var e = this.m,
					r = e[0] + e[3] * i,
					o = e[1] + e[4] * i,
					n = e[2] + e[5] * i;
				e[3] = e[0] * t + e[3], e[4] = e[1] * t + e[4], e[5] = e[2] * t + e[5], e[0] = r, e[1] = o, e[2] = n
			}, gt.prototype.rotate = function(t) {
				var i = this.m,
					e = Math.cos(t),
					r = Math.sin(t),
					o = i[0] * e + i[3] * r,
					n = i[1] * e + i[4] * r,
					s = i[2] * e + i[5] * r;
				i[3] = -i[0] * r + i[3] * e, i[4] = -i[1] * r + i[4] * e, i[5] = -i[2] * r + i[5] * e, i[0] = o, i[1] = n, i[2] = s
			}, gt.prototype.concatenate = function(t) {
				var i = this.m,
					e = t.m,
					r = i[0] * e[0] + i[3] * e[1] + i[6] * e[2],
					o = i[1] * e[0] + i[4] * e[1] + i[7] * e[2],
					n = i[2] * e[0] + i[5] * e[1] + i[8] * e[2],
					s = i[0] * e[3] + i[3] * e[4] + i[6] * e[5],
					_ = i[1] * e[3] + i[4] * e[4] + i[7] * e[5],
					a = i[2] * e[3] + i[5] * e[4] + i[8] * e[5],
					h = i[0] * e[6] + i[3] * e[7] + i[6] * e[8],
					l = i[1] * e[6] + i[4] * e[7] + i[7] * e[8],
					$ = i[2] * e[6] + i[5] * e[7] + i[8] * e[8];
				m[0] = r, m[1] = o, m[2] = n, m[3] = s, m[4] = _, m[5] = a, m[6] = h, m[7] = l, m[8] = $
			}, yt.prototype = new et, yt._$eT = null, yt._$tP = new Object, yt._$2o = function() {
				return null == yt._$eT && (yt._$eT = yt.getID("DST_BASE")), yt._$eT
			}, yt._$27 = function() {
				yt._$tP.clear(), yt._$eT = null
			}, yt.getID = function(t) {
				var i = yt._$tP[t];
				return null == i && (i = new yt(t), yt._$tP[t] = i), i
			}, yt.prototype._$3s = function() {
				return new yt
			}, mt.prototype = new E, mt._$9r = function(t) {
				return new Float32Array(t)
			}, mt._$vb = function(t) {
				return new Int16Array(t)
			}, mt._$cr = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = mt._$9r(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, mt._$mb = function(t, i) {
				return null == t || t._$yL() < i.length ? (t = mt._$vb(2 * i.length), t.put(i), t._$oT(0)) : (t.clear(), t.put(i), t._$oT(0)), t
			}, mt._$Hs = function() {
				return this._$Gr
			}, mt._$as = function(t) {
				this._$Gr = t
			}, mt.prototype.getGL = function() {
				return this.gl
			}, mt.prototype.setGL = function(t) {
				this.gl = t
			}, mt.prototype.setTransform = function(t) {
				this.transform = t
			}, mt.prototype._$ZT = function() {
				var t = this.gl;
				this.firstDraw && (this.initShader(), this.firstDraw = !1, this.anisotropyExt = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic"), this.anisotropyExt && (this.maxAnisotropy = t.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))), t.disable(t.SCISSOR_TEST), t.disable(t.STENCIL_TEST), t.disable(t.DEPTH_TEST), t.frontFace(t.CW), t.enable(t.BLEND), t.colorMask(1, 1, 1, 1), t.bindBuffer(t.ARRAY_BUFFER, null), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
			}, mt.prototype._$Uo = function(t, i, e, r, o, n, s, _) {
				if (!(n < .01 && null == this.clipBufPre_clipContextMask)) {
					var a = (n > .9 && at.EXPAND_W, this.gl);
					if (null == this.gl) throw new Error("gl is null");
					var h = 1 * this._$C0 * n,
						l = 1 * this._$tT * n,
						$ = 1 * this._$WL * n,
						u = this._$lT * n;
					if (null != this.clipBufPre_clipContextMask) {
						a.frontFace(a.CCW), a.useProgram(this.shaderProgram), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
						var p = this.getClipBufPre_clipContextMask().layoutChannelNo,
							f = this.getChannelFlagAsColor(p);
						a.uniform4f(this.u_channelFlag, f.r, f.g, f.b, f.a);
						var c = this.getClipBufPre_clipContextMask().layoutBounds;
						a.uniform4f(this.u_baseColor_Loc, 2 * c.x - 1, 2 * c.y - 1, 2 * c._$EL() - 1, 2 * c._$5T() - 1), a.uniform1i(this.u_maskFlag_Loc, !0)
					} else if (null != this.getClipBufPre_clipContextDraw()) {
						a.useProgram(this.shaderProgramOff), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc_Off), a.vertexAttribPointer(this.a_position_Loc_Off, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc_Off, 1), a.enableVertexAttribArray(this.a_texCoord_Loc_Off), a.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw), a.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4), a.activeTexture(a.TEXTURE2), a.bindTexture(a.TEXTURE_2D, at.fTexture[this.glno]), a.uniform1i(this.s_texture1_Loc_Off, 2);
						var p = this.getClipBufPre_clipContextDraw().layoutChannelNo,
							f = this.getChannelFlagAsColor(p);
						a.uniform4f(this.u_channelFlag_Loc_Off, f.r, f.g, f.b, f.a), a.uniform4f(this.u_baseColor_Loc_Off, h, l, $, u)
					} else a.useProgram(this.shaderProgram), this._$vS = Tt(a, this._$vS, r), this._$no = Pt(a, this._$no, e), a.enableVertexAttribArray(this.a_position_Loc), a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0), this._$NT = Tt(a, this._$NT, o), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this.textures[t]), a.uniform1i(this.s_texture0_Loc, 1), a.enableVertexAttribArray(this.a_texCoord_Loc), a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0), a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4), a.uniform4f(this.u_baseColor_Loc, h, l, $, u), a.uniform1i(this.u_maskFlag_Loc, !1);
					this.culling ? this.gl.enable(a.CULL_FACE) : this.gl.disable(a.CULL_FACE), this.gl.enable(a.BLEND);
					var d, g, y, m;
					if (null != this.clipBufPre_clipContextMask) d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
					else switch (s) {
						case $t._$ms:
							d = a.ONE, g = a.ONE_MINUS_SRC_ALPHA, y = a.ONE, m = a.ONE_MINUS_SRC_ALPHA;
							break;
						case $t._$ns:
							d = a.ONE, g = a.ONE, y = a.ZERO, m = a.ONE;
							break;
						case $t._$_s:
							d = a.DST_COLOR, g = a.ONE_MINUS_SRC_ALPHA, y = a.ZERO, m = a.ONE
					}
					a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(d, g, y, m), this.anisotropyExt && a.texParameteri(a.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
					var T = e.length;
					a.drawElements(a.TRIANGLES, T, a.UNSIGNED_SHORT, 0), a.bindTexture(a.TEXTURE_2D, null)
				}
			}, mt.prototype._$Rs = function() {
				throw new Error("_$Rs")
			}, mt.prototype._$Ds = function(t) {
				throw new Error("_$Ds")
			}, mt.prototype._$K2 = function() {
				for (var t = 0; t < this.textures.length; t++) {
					0 != this.textures[t] && (this.gl._$K2(1, this.textures, t), this.textures[t] = null)
				}
			}, mt.prototype.setTexture = function(t, i) {
				this.textures[t] = i
			}, mt.prototype.initShader = function() {
				var t = this.gl;
				this.loadShaders2(), this.a_position_Loc = t.getAttribLocation(this.shaderProgram, "a_position"), this.a_texCoord_Loc = t.getAttribLocation(this.shaderProgram, "a_texCoord"), this.u_matrix_Loc = t.getUniformLocation(this.shaderProgram, "u_mvpMatrix"), this.s_texture0_Loc = t.getUniformLocation(this.shaderProgram, "s_texture0"), this.u_channelFlag = t.getUniformLocation(this.shaderProgram, "u_channelFlag"), this.u_baseColor_Loc = t.getUniformLocation(this.shaderProgram, "u_baseColor"), this.u_maskFlag_Loc = t.getUniformLocation(this.shaderProgram, "u_maskFlag"), this.a_position_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_position"), this.a_texCoord_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_texCoord"), this.u_matrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"), this.u_clipMatrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"), this.s_texture0_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture0"), this.s_texture1_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture1"), this.u_channelFlag_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_channelFlag"), this.u_baseColor_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_baseColor")
			}, mt.prototype.disposeShader = function() {
				var t = this.gl;
				this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = null), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = null)
			}, mt.prototype.compileShader = function(t, i) {
				var e = this.gl,
					r = i,
					o = e.createShader(t);
				if (null == o) return _._$Ji("_$L0 to create shader"), null;
				if (e.shaderSource(o, r), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
					var n = e.getShaderInfoLog(o);
					return _._$Ji("_$L0 to compile shader : " + n), e.deleteShader(o), null
				}
				return o
			}, mt.prototype.loadShaders2 = function() {
				var t = this.gl;
				if (this.shaderProgram = t.createProgram(), !this.shaderProgram) return !1;
				if (this.shaderProgramOff = t.createProgram(), !this.shaderProgramOff) return !1;
				if (this.vertShader = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}"), !this.vertShader) return _._$Ji("Vertex shader compile _$li!"), !1;
				if (this.vertShaderOff = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord ;}"), !this.vertShaderOff) return _._$Ji("OffVertex shader compile _$li!"), !1;
				if (this.fragShader = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y, v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}"), !this.fragShader) return _._$Ji("Fragment shader compile _$li!"), !1;
				if (this.fragShaderOff = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}"), !this.fragShaderOff) return _._$Ji("OffFragment shader compile _$li!"), !1;
				if (t.attachShader(this.shaderProgram, this.vertShader), t.attachShader(this.shaderProgram, this.fragShader), t.attachShader(this.shaderProgramOff, this.vertShaderOff), t.attachShader(this.shaderProgramOff, this.fragShaderOff), t.linkProgram(this.shaderProgram), t.linkProgram(this.shaderProgramOff), !t.getProgramParameter(this.shaderProgram, t.LINK_STATUS)) {
					var i = t.getProgramInfoLog(this.shaderProgram);
					return _._$Ji("_$L0 to link program: " + i), this.vertShader && (t.deleteShader(this.vertShader), this.vertShader = 0), this.fragShader && (t.deleteShader(this.fragShader), this.fragShader = 0), this.shaderProgram && (t.deleteProgram(this.shaderProgram), this.shaderProgram = 0), this.vertShaderOff && (t.deleteShader(this.vertShaderOff), this.vertShaderOff = 0), this.fragShaderOff && (t.deleteShader(this.fragShaderOff), this.fragShaderOff = 0), this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff), this.shaderProgramOff = 0), !1
				}
				return !0
			}, mt.prototype.createFramebuffer = function() {
				var t = this.gl,
					i = at.clippingMaskBufferSize,
					e = t.createFramebuffer();
				t.bindFramebuffer(t.FRAMEBUFFER, e);
				var r = t.createRenderbuffer();
				t.bindRenderbuffer(t.RENDERBUFFER, r), t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i, i), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, r);
				var o = t.createTexture();
				return t.bindTexture(t.TEXTURE_2D, o), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, i, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, o, 0), t.bindTexture(t.TEXTURE_2D, null), t.bindRenderbuffer(t.RENDERBUFFER, null), t.bindFramebuffer(t.FRAMEBUFFER, null), at.fTexture[this.glno] = o, {
					framebuffer: e,
					renderbuffer: r,
					texture: at.fTexture[this.glno]
				}
			}, St.prototype._$fP = function() {
				var t, i, e, r = this._$ST();
				if (0 == (128 & r)) return 255 & r;
				if (0 == (128 & (t = this._$ST()))) return (127 & r) << 7 | 127 & t;
				if (0 == (128 & (i = this._$ST()))) return (127 & r) << 14 | (127 & t) << 7 | 255 & i;
				if (0 == (128 & (e = this._$ST()))) return (127 & r) << 21 | (127 & t) << 14 | (127 & i) << 7 | 255 & e;
				throw new lt("_$L _$0P  _")
			}, St.prototype.getFormatVersion = function() {
				return this._$S2
			}, St.prototype._$gr = function(t) {
				this._$S2 = t
			}, St.prototype._$3L = function() {
				return this._$fP()
			}, St.prototype._$mP = function() {
				return this._$zT(), this._$F += 8, this._$T.getFloat64(this._$F - 8)
			}, St.prototype._$_T = function() {
				return this._$zT(), this._$F += 4, this._$T.getFloat32(this._$F - 4)
			}, St.prototype._$6L = function() {
				return this._$zT(), this._$F += 4, this._$T.getInt32(this._$F - 4)
			}, St.prototype._$ST = function() {
				return this._$zT(), this._$T.getInt8(this._$F++)
			}, St.prototype._$9T = function() {
				return this._$zT(), this._$F += 2, this._$T.getInt16(this._$F - 2)
			}, St.prototype._$2T = function() {
				throw this._$zT(), this._$F += 8, new lt("_$L _$q read long")
			}, St.prototype._$po = function() {
				return this._$zT(), 0 != this._$T.getInt8(this._$F++)
			};
			var xt = !0;
			St.prototype._$bT = function() {
				this._$zT();
				var t = this._$3L(),
					i = null;
				if (xt) try {
					var e = new ArrayBuffer(2 * t);
					i = new Uint16Array(e);
					for (var r = 0; r < t; ++r) i[r] = this._$T.getUint8(this._$F++);
					return String.fromCharCode.apply(null, i)
				} catch (t) {
					xt = !1
				}
				try {
					var o = new Array;
					if (null == i)
						for (var r = 0; r < t; ++r) o[r] = this._$T.getUint8(this._$F++);
					else
						for (var r = 0; r < t; ++r) o[r] = i[r];
					return String.fromCharCode.apply(null, o)
				} catch (t) {
					console.log("read utf8 / _$rT _$L0 !! : " + t)
				}
			}, St.prototype._$cS = function() {
				this._$zT();
				for (var t = this._$3L(), i = new Int32Array(t), e = 0; e < t; e++) i[e] = this._$T.getInt32(this._$F), this._$F += 4;
				return i
			}, St.prototype._$Tb = function() {
				this._$zT();
				for (var t = this._$3L(), i = new Float32Array(t), e = 0; e < t; e++) i[e] = this._$T.getFloat32(this._$F), this._$F += 4;
				return i
			}, St.prototype._$5b = function() {
				this._$zT();
				for (var t = this._$3L(), i = new Float64Array(t), e = 0; e < t; e++) i[e] = this._$T.getFloat64(this._$F), this._$F += 8;
				return i
			}, St.prototype._$nP = function() {
				return this._$Jb(-1)
			}, St.prototype._$Jb = function(t) {
				if (this._$zT(), t < 0 && (t = this._$3L()), t == G._$7P) {
					var i = this._$6L();
					if (0 <= i && i < this._$Ko.length) return this._$Ko[i];
					throw new lt("_$sL _$4i @_$m0")
				}
				var e = this._$4b(t);
				return this._$Ko.push(e), e
			}, St.prototype._$4b = function(t) {
				if (0 == t) return null;
				if (50 == t) {
					var i = this._$bT(),
						e = b.getID(i);
					return e
				}
				if (51 == t) {
					var i = this._$bT(),
						e = yt.getID(i);
					return e
				}
				if (134 == t) {
					var i = this._$bT(),
						e = l.getID(i);
					return e
				}
				if (60 == t) {
					var i = this._$bT(),
						e = u.getID(i);
					return e
				}
				if (t >= 48) {
					var r = G._$9o(t);
					return null != r ? (r._$F0(this), r) : null
				}
				switch (t) {
					case 1:
						return this._$bT();
					case 10:
						return new n(this._$6L(), !0);
					case 11:
						return new S(this._$mP(), this._$mP(), this._$mP(), this._$mP());
					case 12:
						return new S(this._$_T(), this._$_T(), this._$_T(), this._$_T());
					case 13:
						return new L(this._$mP(), this._$mP());
					case 14:
						return new L(this._$_T(), this._$_T());
					case 15:
						for (var o = this._$3L(), e = new Array(o), s = 0; s < o; s++) e[s] = this._$nP();
						return e;
					case 17:
						var e = new F(this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP(), this._$mP());
						return e;
					case 21:
						return new h(this._$6L(), this._$6L(), this._$6L(), this._$6L());
					case 22:
						return new pt(this._$6L(), this._$6L());
					case 23:
						throw new Error("_$L _$ro ");
					case 16:
					case 25:
						return this._$cS();
					case 26:
						return this._$5b();
					case 27:
						return this._$Tb();
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9:
					case 18:
					case 19:
					case 20:
					case 24:
					case 28:
						throw new lt("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + t);
					default:
						throw new lt("_$6 _$q : _$nP() NO _$i : " + t)
				}
			}, St.prototype._$8L = function() {
				return 0 == this._$hL ? this._$v0 = this._$ST() : 8 == this._$hL && (this._$v0 = this._$ST(), this._$hL = 0), 1 == (this._$v0 >> 7 - this._$hL++ & 1)
			}, St.prototype._$zT = function() {
				0 != this._$hL && (this._$hL = 0)
			}, vt.prototype._$wP = function(t, i, e) {
				for (var r = 0; r < e; r++) {
					for (var o = 0; o < i; o++) {
						var n = 2 * (o + r * i);
						console.log("(% 7.3f , % 7.3f) , ", t[n], t[n + 1])
					}
					console.log("\n")
				}
				console.log("\n")
			}, Lt._$2S = Math.PI / 180, Lt._$bS = Math.PI / 180, Lt._$wS = 180 / Math.PI, Lt._$NS = 180 / Math.PI, Lt.PI_F = Math.PI, Lt._$kT = [0, .012368, .024734, .037097, .049454, .061803, .074143, .086471, .098786, .111087, .12337, .135634, .147877, .160098, .172295, .184465, .196606, .208718, .220798, .232844, .244854, .256827, .268761, .280654, .292503, .304308, .316066, .327776, .339436, .351044, .362598, .374097, .385538, .396921, .408243, .419502, .430697, .441826, .452888, .463881, .474802, .485651, .496425, .507124, .517745, .528287, .538748, .549126, .559421, .56963, .579752, .589785, .599728, .609579, .619337, .629, .638567, .648036, .657406, .666676, .675843, .684908, .693867, .70272, .711466, .720103, .72863, .737045, .745348, .753536, .76161, .769566, .777405, .785125, .792725, .800204, .807561, .814793, .821901, .828884, .835739, .842467, .849066, .855535, .861873, .868079, .874153, .880093, .885898, .891567, .897101, .902497, .907754, .912873, .917853, .922692, .92739, .931946, .936359, .940629, .944755, .948737, .952574, .956265, .959809, .963207, .966457, .96956, .972514, .97532, .977976, .980482, .982839, .985045, .987101, .989006, .990759, .992361, .993811, .995109, .996254, .997248, .998088, .998776, .999312, .999694, .999924, 1], Lt._$92 = function(t, i) {
				var e = Math.atan2(t[1], t[0]),
					r = Math.atan2(i[1], i[0]);
				return Lt._$tS(e, r)
			}, Lt._$tS = function(t, i) {
				for (var e = t - i; e < -Math.PI;) e += 2 * Math.PI;
				for (; e > Math.PI;) e -= 2 * Math.PI;
				return e
			}, Lt._$9 = function(t) {
				return Math.sin(t)
			}, Lt.fcos = function(t) {
				return Math.cos(t)
			}, Mt.prototype._$u2 = function() {
				return this._$IS[0]
			}, Mt.prototype._$yo = function() {
				return this._$AT && !this._$IS[0]
			}, Mt.prototype._$GT = function() {
				return this._$e0
			}, Et._$W2 = 0, Et.SYSTEM_INFO = null, Et.USER_AGENT = navigator.userAgent, Et.isIPhone = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone
			}, Et.isIOS = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone || Et.SYSTEM_INFO._isIPad
			}, Et.isAndroid = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isAndroid
			}, Et.getOSVersion = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO.version
			}, Et.getOS = function() {
				return Et.SYSTEM_INFO || Et.setup(), Et.SYSTEM_INFO._isIPhone || Et.SYSTEM_INFO._isIPad ? "iOS" : Et.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS"
			}, Et.setup = function() {
				function t(t, i) {
					for (var e = t.substring(i).split(/[ _,;\.]/), r = 0, o = 0; o <= 2 && !isNaN(e[o]); o++) {
						var n = parseInt(e[o]);
						if (n < 0 || n > 999) {
							_._$li("err : " + n + " @UtHtml5.setup()"), r = 0;
							break
						}
						r += n * Math.pow(1e3, 2 - o)
					}
					return r
				}
				var i, e = Et.USER_AGENT,
					r = Et.SYSTEM_INFO = {
						userAgent: e
					};
				if ((i = e.indexOf("iPhone OS ")) >= 0) r.os = "iPhone", r._isIPhone = !0, r.version = t(e, i + "iPhone OS ".length);
				else if ((i = e.indexOf("iPad")) >= 0) {
					if ((i = e.indexOf("CPU OS")) < 0) return void _._$li(" err : " + e + " @UtHtml5.setup()");
					r.os = "iPad", r._isIPad = !0, r.version = t(e, i + "CPU OS ".length)
				} else(i = e.indexOf("Android")) >= 0 ? (r.os = "Android", r._isAndroid = !0, r.version = t(e, i + "Android ".length)) : (r.os = "-", r.version = -1)
			}, window.UtSystem = w, window.UtDebug = _, window.LDTransform = gt, window.LDGL = nt, window.Live2D = at, window.Live2DModelWebGL = ft, window.Live2DModelJS = q, window.Live2DMotion = J, window.MotionQueueManager = ct, window.PhysicsHair = f, window.AMotion = s, window.PartsDataID = l, window.DrawDataID = b, window.BaseDataID = yt, window.ParamID = u, at.init();
			var At = !1
		}()
	}).call(i, e(7))
}, function(t, i) {
	t.exports = {
		import: function() {
			throw new Error("System.import cannot be used indirectly")
		}
	}
}, function(t, i, e) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}

	function o() {
		this.models = [], this.count = -1, this.reloadFlg = !1, Live2D.init(), n.Live2DFramework.setPlatformManager(new _.default)
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.default = o;
	var n = e(0),
		s = e(9),
		_ = r(s),
		a = e(10),
		h = r(a),
		l = e(1),
		$ = r(l);
	o.prototype.createModel = function() {
		var t = new h.default;
		return this.models.push(t), t
	}, o.prototype.changeModel = function(t, i) {
		if (this.reloadFlg) {
			this.reloadFlg = !1;
			this.releaseModel(0, t), this.createModel(), this.models[0].load(t, i)
		}
	}, o.prototype.getModel = function(t) {
		return t >= this.models.length ? null : this.models[t]
	}, o.prototype.releaseModel = function(t, i) {
		this.models.length <= t || (this.models[t].release(i), delete this.models[t], this.models.splice(t, 1))
	}, o.prototype.numModels = function() {
		return this.models.length
	}, o.prototype.setDrag = function(t, i) {
		for (var e = 0; e < this.models.length; e++) this.models[e].setDrag(t, i)
	}, o.prototype.maxScaleEvent = function() {
		$.default.DEBUG_LOG && console.log("Max scale event.");
		for (var t = 0; t < this.models.length; t++) this.models[t].startRandomMotion($.default.MOTION_GROUP_PINCH_IN, $.default.PRIORITY_NORMAL)
	}, o.prototype.minScaleEvent = function() {
		$.default.DEBUG_LOG && console.log("Min scale event.");
		for (var t = 0; t < this.models.length; t++) this.models[t].startRandomMotion($.default.MOTION_GROUP_PINCH_OUT, $.default.PRIORITY_NORMAL)
	}, o.prototype.tapEvent = function(t, i) {
		$.default.DEBUG_LOG && console.log("tapEvent view x:" + t + " y:" + i);
		for (var e = 0; e < this.models.length; e++) this.models[e].hitTest($.default.HIT_AREA_HEAD, t, i) ? ($.default.DEBUG_LOG && console.log("Tap face."), this.models[e].setRandomExpression()) : this.models[e].hitTest($.default.HIT_AREA_BODY, t, i) ? ($.default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"), this.models[e].startRandomMotion($.default.MOTION_GROUP_TAP_BODY, $.default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("head", t, i) ? ($.default.DEBUG_LOG && console.log("Tap face."), this.models[e].startRandomMotion($.default.MOTION_GROUP_FLICK_HEAD, $.default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("body", t, i) && ($.default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"), this.models[e].startRandomMotion($.default.MOTION_GROUP_TAP_BODY, $.default.PRIORITY_NORMAL));
		return !0
	}
}, function(t, i, e) {
	"use strict";

	function r() {}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.default = r;
	var o = e(2);
	var requestCache = {};
	r.prototype.loadBytes = function(t, i) {
        if(t === "https://www.luogu.com.cn/fe/api/problem/downloadAttachment/rjg3qdqi"){
            let strData = `{"type":"Live2D Model Setting","name":"22-3695903","label":"22","model":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/02z8vu7u","textures":["https://s2.loli.net/2023/05/01/I8zAEwQs2N7iBn4.png","https://s2.loli.net/2023/05/01/P37cG41dTu9fBaI.png","https://s2.loli.net/2023/05/01/jwRBpbfVPOhQLcY.png","https://s2.loli.net/2023/05/01/94Vwl78rWKDBYPe.png"],"layout":{"center_x":0,"center_y":0.1,"width":2.3,"height":2.3},"hit_areas_custom":{"head_x":[-0.33,0.6],"head_y":[0.19,-0.2],"body_x":[-0.3,-0.25],"body_y":[0.3,-0.9]},"motions":{"idle":[{"file":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/h94ndd1x","fade_in":2000,"fade_out":2000},{"file":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/5bu1t74p","fade_in":2000,"fade_out":2000},{"file":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/xqbg7q8c","fade_in":100,"fade_out":100}],"flick_head":[{"file":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/yyeng2ao","fade_in":500,"fade_out":200}],"tap_body":[{"file":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/yyeng2ao","fade_in":500,"fade_out":200}],"thanking":[{"file":"https://www.luogu.com.cn/fe/api/problem/downloadAttachment/cpm6ey6i","fade_in":2000,"fade_out":2000}]}}`;
            const encoder = new TextEncoder();
            const arrayBuffer = encoder.encode(strData).buffer;
            requestCache[t] = arrayBuffer;
        }else if (t === "https://www.luogu.com.cn/fe/api/problem/downloadAttachment/02z8vu7u"){
            const base64Str = `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`;
            // 将 base64 编码字符串转换为二进制字符串
            const binaryStr = atob(base64Str);

            // 创建一个存储二进制数据的 Uint8Array 数组
            const array = new Uint8Array(binaryStr.length);

            // 遍历二进制字符串中的每个字符，将其转换为一个无符号 8 位整数并保存到数组中
            for (let i = 0; i < binaryStr.length; i++) {
            array[i] = binaryStr.charCodeAt(i);
            }

            // 将 Uint8Array 数组转换为 ArrayBuffer 类型
            const mocArrayBuffer = array.buffer;
            requestCache[t] = mocArrayBuffer;
        }
		if (requestCache[t] !== undefined) {
			i(requestCache[t]);
			return;
		}
		var e = new XMLHttpRequest;
		e.open("GET", t, !0), e.responseType = "arraybuffer", e.onload = function() {
			switch (e.status) {
				case 200:
					requestCache[t] = e.response;
					i(e.response);
					break;
				default:
					console.error("Failed to load (" + e.status + ") : " + t)
			}
		}, e.send(null)
	}, r.prototype.loadString = function(t) {
		this.loadBytes(t, function(t) {
			return t
		})
	}, r.prototype.loadLive2DModel = function(t, i) {
		var e = null;
		this.loadBytes(t, function(t) {
			e = Live2DModelWebGL.loadModel(t), i(e)
		})
	}, r.prototype.loadTexture = function(t, i, e, r) {
		var n = new Image;
		n.crossOrigin = "Anonymous", n.src = e;
		n.onload = function() {
			var e = (0, o.getContext)(),
				s = e.createTexture();
			if (!s) return console.error("Failed to generate gl texture name."), -1;
			0 == t.isPremultipliedAlpha() && e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, s), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR_MIPMAP_NEAREST), e.generateMipmap(e.TEXTURE_2D), t.setTexture(i, s), s = null, "function" == typeof r && r()
		}, n.onerror = function() {
			console.error("Failed to load image : " + e)
		}
	}, r.prototype.jsonParseFromBytes = function(t) {
		var i, e = new Uint8Array(t, 0, 3);
		return i = 239 == e[0] && 187 == e[1] && 191 == e[2] ? String.fromCharCode.apply(null, new Uint8Array(t, 3)) : String.fromCharCode.apply(null, new Uint8Array(t)), JSON.parse(i)
	}, r.prototype.log = function(t) {}
}, function(t, i, e) {
	"use strict";

	function r(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}

	function o() {
		n.L2DBaseModel.prototype.constructor.call(this), this.modelHomeDir = "", this.modelSetting = null, this.tmpMatrix = []
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.default = o;
	var n = e(0),
		s = e(11),
		_ = r(s),
		a = e(1),
		h = r(a),
		l = e(3),
		$ = r(l);
	o.prototype = new n.L2DBaseModel, o.prototype.load = function(t, i, e) {
		this.setUpdating(!0), this.setInitialized(!1), this.modelHomeDir = "", this.modelSetting = new _.default;
		var r = this;
		this.modelSetting.loadModelSetting(i, function() {
			var t = r.modelHomeDir + r.modelSetting.getModelFile();
			r.loadModelData(t, function(t) {
				for (var i = 0; i < r.modelSetting.getTextureNum(); i++) {
					if (/^https?:\/\/|^\/\//i.test(r.modelSetting.getTextureFile(i))) var o = r.modelSetting.getTextureFile(i);
					// else var o = r.modelHomeDir + r.modelSetting.getTextureFile(i);
					else var o = r.modelSetting.getTextureFile(i);
					r.loadTexture(i, o, function() {
						if (r.isTexLoaded) {
							if (r.modelSetting.getExpressionNum() > 0) {
								r.expressions = {};
								for (var t = 0; t < r.modelSetting.getExpressionNum(); t++) {
									var i = r.modelSetting.getExpressionName(t),
										o = r.modelHomeDir + r.modelSetting.getExpressionFile(t);
									r.loadExpression(i, o)
								}
							} else r.expressionManager = null, r.expressions = {};
							if (r.eyeBlink, null != r.modelSetting.getPhysicsFile() ? r.loadPhysics(r.modelHomeDir + r.modelSetting.getPhysicsFile()) : r.physics = null, null != r.modelSetting.getPoseFile() ? r.loadPose(r.modelHomeDir + r.modelSetting.getPoseFile(), function() {
									r.pose.updateParam(r.live2DModel)
								}) : r.pose = null, null != r.modelSetting.getLayout()) {
								var n = r.modelSetting.getLayout();
								null != n.width && r.modelMatrix.setWidth(n.width), null != n.height && r.modelMatrix.setHeight(n.height), null != n.x && r.modelMatrix.setX(n.x), null != n.y && r.modelMatrix.setY(n.y), null != n.center_x && r.modelMatrix.centerX(n.center_x), null != n.center_y && r.modelMatrix.centerY(n.center_y), null != n.top && r.modelMatrix.top(n.top), null != n.bottom && r.modelMatrix.bottom(n.bottom), null != n.left && r.modelMatrix.left(n.left), null != n.right && r.modelMatrix.right(n.right)
							}
							if (null != r.modelSetting.getHitAreasCustom()) {
								var s = r.modelSetting.getHitAreasCustom();
								null != s.head_x && (h.default.hit_areas_custom_head_x = s.head_x), null != s.head_y && (h.default.hit_areas_custom_head_y = s.head_y), null != s.body_x && (h.default.hit_areas_custom_body_x = s.body_x), null != s.body_y && (h.default.hit_areas_custom_body_y = s.body_y)
							}
							for (var t = 0; t < r.modelSetting.getInitParamNum(); t++) r.live2DModel.setParamFloat(r.modelSetting.getInitParamID(t), r.modelSetting.getInitParamValue(t));
							for (var t = 0; t < r.modelSetting.getInitPartsVisibleNum(); t++) r.live2DModel.setPartsOpacity(r.modelSetting.getInitPartsVisibleID(t), r.modelSetting.getInitPartsVisibleValue(t));
							r.live2DModel.saveParam(), r.preloadMotionGroup(h.default.MOTION_GROUP_IDLE), r.preloadMotionGroup(h.default.MOTION_GROUP_SLEEPY), r.mainMotionManager.stopAllMotions(), r.setUpdating(!1), r.setInitialized(!0), "function" == typeof e && e()
						}
					})
				}
			})
		})
	}, o.prototype.release = function(t) {
		var i = n.Live2DFramework.getPlatformManager();
		t.deleteTexture(i.texture)
	}, o.prototype.preloadMotionGroup = function(t) {
		for (var i = this, e = 0; e < this.modelSetting.getMotionNum(t); e++) {
			var r = this.modelSetting.getMotionFile(t, e);
			this.loadMotion(r, this.modelHomeDir + r, function(r) {
				r.setFadeIn(i.modelSetting.getMotionFadeIn(t, e)), r.setFadeOut(i.modelSetting.getMotionFadeOut(t, e))
			})
		}
	}, o.prototype.update = function() {
		if (null == this.live2DModel) return void(h.default.DEBUG_LOG && console.error("Failed to update."));
		var t = UtSystem.getUserTimeMSec() - this.startTimeMSec,
			i = t / 1e3,
			e = 2 * i * Math.PI;
		if (this.mainMotionManager.isFinished()) {
			"1" === sessionStorage.getItem("Sleepy") ? this.startRandomMotion(h.default.MOTION_GROUP_SLEEPY, h.default.PRIORITY_SLEEPY) : this.startRandomMotion(h.default.MOTION_GROUP_IDLE, h.default.PRIORITY_IDLE)
		}
		this.live2DModel.loadParam(), this.mainMotionManager.updateParam(this.live2DModel) || null != this.eyeBlink && this.eyeBlink.updateParam(this.live2DModel), this.live2DModel.saveParam(), null == this.expressionManager || null == this.expressions || this.expressionManager.isFinished() || this.expressionManager.updateParam(this.live2DModel), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 30 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 30 * this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", this.dragX * this.dragY * -30, 1), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 10 * this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1), this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1), this.live2DModel.addToParamFloat("PARAM_ANGLE_X", Number(15 * Math.sin(e / 6.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", Number(8 * Math.sin(e / 3.5345)), .5), this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", Number(10 * Math.sin(e / 5.5345)), .5), this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", Number(4 * Math.sin(e / 15.5345)), .5), this.live2DModel.setParamFloat("PARAM_BREATH", Number(.5 + .5 * Math.sin(e / 3.2345)), 1), null != this.physics && this.physics.updateParam(this.live2DModel), null == this.lipSync && this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", this.lipSyncValue), null != this.pose && this.pose.updateParam(this.live2DModel), this.live2DModel.update()
	}, o.prototype.setRandomExpression = function() {
		var t = [];
		for (var i in this.expressions) t.push(i);
		var e = parseInt(Math.random() * t.length);
		this.setExpression(t[e])
	}, o.prototype.startRandomMotion = function(t, i) {
		var e = this.modelSetting.getMotionNum(t),
			r = parseInt(Math.random() * e);
		this.startMotion(t, r, i)
	}, o.prototype.startMotion = function(t, i, e) {
		var r = this.modelSetting.getMotionFile(t, i);
		if (null == r || "" == r) return void(h.default.DEBUG_LOG && console.error("Failed to motion."));
		if (e == h.default.PRIORITY_FORCE) this.mainMotionManager.setReservePriority(e);
		else if (!this.mainMotionManager.reserveMotion(e)) return void(h.default.DEBUG_LOG && console.log("Motion is running."));
		var o, n = this;
		null == this.motions[t] ? this.loadMotion(null, this.modelHomeDir + r, function(r) {
			o = r, n.setFadeInFadeOut(t, i, e, o)
		}) : (o = this.motions[t], n.setFadeInFadeOut(t, i, e, o))
	}, o.prototype.setFadeInFadeOut = function(t, i, e, r) {
		var o = this.modelSetting.getMotionFile(t, i);
		if (r.setFadeIn(this.modelSetting.getMotionFadeIn(t, i)), r.setFadeOut(this.modelSetting.getMotionFadeOut(t, i)), h.default.DEBUG_LOG && console.log("Start motion : " + o), null == this.modelSetting.getMotionSound(t, i)) this.mainMotionManager.startMotionPrio(r, e);
		else {
			var n = this.modelSetting.getMotionSound(t, i),
				s = document.createElement("audio");
			s.src = this.modelHomeDir + n, h.default.DEBUG_LOG && console.log("Start sound : " + n), s.play(), this.mainMotionManager.startMotionPrio(r, e)
		}
	}, o.prototype.setExpression = function(t) {
		var i = this.expressions[t];
		h.default.DEBUG_LOG && console.log("Expression : " + t), this.expressionManager.startMotion(i, !1)
	}, o.prototype.draw = function(t) {
		$.default.push(), $.default.multMatrix(this.modelMatrix.getArray()), this.tmpMatrix = $.default.getMatrix(), this.live2DModel.setMatrix(this.tmpMatrix), this.live2DModel.draw(), $.default.pop()
	}, o.prototype.hitTest = function(t, i, e) {
		for (var r = this.modelSetting.getHitAreaNum(), o = 0; o < r; o++)
			if (t == this.modelSetting.getHitAreaName(o)) {
				var n = this.modelSetting.getHitAreaID(o);
				return this.hitTestSimple(n, i, e)
			} return !1
	}, o.prototype.hitTestCustom = function(t, i, e) {
		return "head" == t ? this.hitTestSimpleCustom(h.default.hit_areas_custom_head_x, h.default.hit_areas_custom_head_y, i, e) : "body" == t && this.hitTestSimpleCustom(h.default.hit_areas_custom_body_x, h.default.hit_areas_custom_body_y, i, e)
	}
}, function(t, i, e) {
	"use strict";

	function r() {
		this.NAME = "name", this.ID = "id", this.MODEL = "model", this.TEXTURES = "textures", this.HIT_AREAS = "hit_areas", this.PHYSICS = "physics", this.POSE = "pose", this.EXPRESSIONS = "expressions", this.MOTION_GROUPS = "motions", this.SOUND = "sound", this.FADE_IN = "fade_in", this.FADE_OUT = "fade_out", this.LAYOUT = "layout", this.HIT_AREAS_CUSTOM = "hit_areas_custom", this.INIT_PARAM = "init_param", this.INIT_PARTS_VISIBLE = "init_parts_visible", this.VALUE = "val", this.FILE = "file", this.json = {}
	}
	Object.defineProperty(i, "__esModule", {
		value: !0
	}), i.default = r;
	var o = e(0);
	r.prototype.loadModelSetting = function(t, i) {
		var e = this;
		o.Live2DFramework.getPlatformManager().loadBytes(t, function(t) {
			var r = String.fromCharCode.apply(null, new Uint8Array(t));
			e.json = JSON.parse(r), i()
		})
	}, r.prototype.getTextureFile = function(t) {
		return null == this.json[this.TEXTURES] || null == this.json[this.TEXTURES][t] ? null : this.json[this.TEXTURES][t]
	}, r.prototype.getModelFile = function() {
		return this.json[this.MODEL]
	}, r.prototype.getTextureNum = function() {
		return null == this.json[this.TEXTURES] ? 0 : this.json[this.TEXTURES].length
	}, r.prototype.getHitAreaNum = function() {
		return null == this.json[this.HIT_AREAS] ? 0 : this.json[this.HIT_AREAS].length
	}, r.prototype.getHitAreaID = function(t) {
		return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.ID]
	}, r.prototype.getHitAreaName = function(t) {
		return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.NAME]
	}, r.prototype.getPhysicsFile = function() {
		return this.json[this.PHYSICS]
	}, r.prototype.getPoseFile = function() {
		return this.json[this.POSE]
	}, r.prototype.getExpressionNum = function() {
		return null == this.json[this.EXPRESSIONS] ? 0 : this.json[this.EXPRESSIONS].length
	}, r.prototype.getExpressionFile = function(t) {
		return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.FILE]
	}, r.prototype.getExpressionName = function(t) {
		return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.NAME]
	}, r.prototype.getLayout = function() {
		return this.json[this.LAYOUT]
	}, r.prototype.getHitAreasCustom = function() {
		return this.json[this.HIT_AREAS_CUSTOM]
	}, r.prototype.getInitParamNum = function() {
		return null == this.json[this.INIT_PARAM] ? 0 : this.json[this.INIT_PARAM].length
	}, r.prototype.getMotionNum = function(t) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] ? 0 : this.json[this.MOTION_GROUPS][t].length
	}, r.prototype.getMotionFile = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] ? null : this.json[this.MOTION_GROUPS][t][i][this.FILE]
	}, r.prototype.getMotionSound = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.SOUND] ? null : this.json[this.MOTION_GROUPS][t][i][this.SOUND]
	}, r.prototype.getMotionFadeIn = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_IN] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_IN]
	}, r.prototype.getMotionFadeOut = function(t, i) {
		return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT]
	}, r.prototype.getInitParamID = function(t) {
		return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? null : this.json[this.INIT_PARAM][t][this.ID]
	}, r.prototype.getInitParamValue = function(t) {
		return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? NaN : this.json[this.INIT_PARAM][t][this.VALUE]
	}, r.prototype.getInitPartsVisibleNum = function() {
		return null == this.json[this.INIT_PARTS_VISIBLE] ? 0 : this.json[this.INIT_PARTS_VISIBLE].length
	}, r.prototype.getInitPartsVisibleID = function(t) {
		return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? null : this.json[this.INIT_PARTS_VISIBLE][t][this.ID]
	}, r.prototype.getInitPartsVisibleValue = function(t) {
		return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? NaN : this.json[this.INIT_PARTS_VISIBLE][t][this.VALUE]
	}
}]);
