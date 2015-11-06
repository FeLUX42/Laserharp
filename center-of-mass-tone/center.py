# getting started https://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_gui/py_video_display/py_video_display.html

import numpy as np
import cv2
import rtmidi_python as rtmidi
import time

import scipy.misc

cap = cv2.VideoCapture(0)	# 0 for /dev/video0; 1 for /dev/video1; or a filename.


midiout = rtmidi.MidiOut()

for port_name in midiout.ports:
    print port_name

if midiout.ports:
#    midiout.open_virtual_port("My virtual output")
    midiout.open_port(2)
    print "openend port"
else:
    midiout.open_virtual_port("My virtual output")

time.sleep(0.1)
program_change = [0xC0, 19]
midiout.send_message(program_change) 

note_on = [0x90, 60, 127] # channel 1, middle C, velocity 112	
note_off = [0x80, 60, 50]
midiout.send_message(note_on)
print "on"
time.sleep(1)
print "off"
midiout.send_message(note_off)
print "did you hear a tone? there is a problem if you didn't."


#print("dimension", cap.get(3), cap.get(4)) #http://docs.opencv.org/modules/highgui/doc/reading_and_writing_images_and_video.html#videocapture-get
#print("fps:", cap.get(5))
#print("codec:", cap.get(6))
#print("bright:", cap.get(10))
#print("cont:", cap.get(11))
#print("sat:", cap.get(12))
#print("rgp:", cap.get(16))

sp_old = 0;
end = 0
start= 0
while(True):
	# Capture frame-by-frame
	ret, frame = cap.read()

	# Our operations on the frame come here
	#gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	print(frame.shape)
	
	rot = frame[:,:,2]	# image is sorted BGR
	
	
	#scipy.misc.imsave("b.png", frame[:,:,0]);
	#scipy.misc.imsave("g.png", frame[:,:,1]);
	#scipy.misc.imsave("r.png", frame[:,:,2]);
	#scipy.misc.imsave("bgr.png", frame);  # gives wrong colors, because false sorted BGR interpreted as RGB
	# Display the resulting frame
	
	rs = rot[100,:]
	cv2.imshow('frame',rs)
	sp = [0,0]
	dim = rot.shape
	#print(rs.shape)
	#rs[:] = 0
	#rs[30] = 100
	#print(rs)
	
	for x in xrange(rs.shape[0]):
		#for y in xrange(dim[1]):
			#sp[0] += x*rot[x,y]
			sp[0] += x*rs[x]
			#sp[1] += y*rot[x,y] / dim[1]
			pass
	mass = sum( rot[100,:])

	#print(mass, sp)
	#print(sp)
	sp[0] = sp[0]/ mass
	print(sp)
	print(sp[0]/5)
	midiout.send_message([0x80, sp_old, 10])
	end = time.clock()
	print "%.2gs" % (end-start)
	start = time.clock()
	midiout.send_message([0x90, sp[0]/5, 127])
	sp_old = sp[0]/5;
	
	
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
