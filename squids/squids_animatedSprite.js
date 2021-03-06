let AnimatedSprite = function(images, framerate = 10)
{

	let o = new Thing();
		o.frames = images;
		o.framerate = framerate;
		o.images = images
		o.current_frame = 0;
		o.playing = false;
		o.advance_frame = function(num_ticks)
		{
			if(num_ticks % o.framerate === 0)
			{
				if(!Object.keys(o.frames))
				{
					return;
				}
				// set next frame to draw
				if(o.current_frame === Object.keys(o.frames).length - 1)
				{
					o.current_frame = -1;
				}
				o.current_frame += 1;
			}
		}
		o.play = function()
		{
			o.playing = true;
		}
		o.stop = function()
		{
			// stop on current frame
			o.playing = false;
		}
		o.playing_frame = function()
		{
			let f = o.frames[o.current_frame];
			return f;
		}
		o.listen("tick", function(delta, num_ticks)
		{
			if(o.playing)
			{
				o.advance_frame(num_ticks);
			}
		})

	return o;
}

let AnimatedSquid = function(position = vec(0, 0), prefix, images, framerate = 10, playing = true)
{
	let a = new AnimatedSprite(prefix, images, framerate);
		a.playing = playing;
	let o = new Squid(position, a.frames[0]);
		o.animations = {};
		o.animations[0] = a;
		o.current_animation = o.animations[0];
		o.listen("pre_tick", function(delta, num_ticks)
		{
			o.image = o.current_animation.playing_frame();
		});

	return o;
}
