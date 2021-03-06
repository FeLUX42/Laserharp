# getting started https://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_gui/py_video_display/py_video_display.html

import numpy as np
import cv2
import rtmidi_python as rtmidi
import time
import scipy.misc
import math

#---- CV2 command overview ---#
#cap = cv2.VideoCapture(0)	# 0 for /dev/video0; 1 for /dev/video1; or a filename.
#print("dimension", cap.get(3), cap.get(4)) #http://docs.opencv.org/modules/highgui/doc/reading_and_writing_images_and_video.html#videocapture-get
#print("fps:", cap.get(5))
#print("codec:", cap.get(6))
#print("bright:", cap.get(10))
#print("cont:", cap.get(11))
#print("sat:", cap.get(12))
#print("rgp:", cap.get(16))

lasernumber = 10

def drawCalibrationProgress(allCoords):
    #print allCoords

    cap = cv2.VideoCapture(0) # 0 for /dev/video0; 1 for /dev/video1; or a filename.
    ret, bild = cap.read()
    for i in range(len(allCoords)):
        coord11 = int(allCoords[i][0][0])
        coord12 = int(allCoords[i][0][1])
        coord21 = int(allCoords[i][1][0])
        coord22 = int(allCoords[i][1][1])
        #    cv2.drawContours(img,[cnt],0,(255,0,0),2)
        #    cv2.drawContours(mask,[cnt],0,255,-1)
        #print coord11,coord12
        #print "und 2:"
        #print coord21,coord22
        #cv2.line(bild, (0,0),(511,511),(255,0,255),3)
        cv2.line(bild, (coord11,coord12),(coord21,coord22),(255,185,15),3)
    cv2.imshow('frame',bild)
    print "All right, press 'AnyKey' if You are satisfied."
    b = cv2.waitKey(0)
    #b = chr(b) #get the letter from the number returned by waitKey

def readInputUntilRecognition():
    #we want to create a mask and display the subtracted background
    #bild = cv2.imread("../material/bild.jpg")
    m=0 #declaration for later maximum distance of detected point
    positionOfElement = 0 #same thing
    #cap = cv2.VideoCapture('output1.avi')
    cap = cv2.VideoCapture(0) # 0 for /dev/video0; 1 for /dev/video1; or a filename.
    ret1, bild1 = cap.read()
    height = bild1.shape[1]
    tone_old = 100;
    while(cap.isOpened()):
        ret, bild = cap.read()

        #redImage = bild[:,:,2]
        img = bild
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        ret,gray = cv2.threshold(gray,127,255,0)
        gray2 = gray.copy()
        mask = np.zeros(gray.shape,np.uint8)

        _, contours, hier = cv2.findContours(gray,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
        #if contours:
            #print len(contours[0])
        dis_array = []
        for cnt in contours:
            if 10 < cv2.contourArea(cnt) < 20:
                cv2.drawContours(img,[cnt],0,(0,255,0),2)
                #print("Abstand eines gefundenen Punktes vom oberen Bildschirmrand:")
                #print cnt[:,:,0]
                distance_above = np.mean(cnt[:,:,1])
                distance_fromLeft = np.mean(cnt[:,:,0])
                dis_array.append([distance_fromLeft,distance_above])
                cv2.drawContours(mask,[cnt],0,255,-1)
                tone = np.round((height-distance_above)*255/height/3)
                #(tones only have a scale from 0 to 255)
                #print(tone)
                midiout.send_message([0x80, tone_old, 10])
                #end = time.clock()
                #print "%.2f Hz" % (1./(end-start))
                #print "%.2f s" % (end-start)
                #start = time.clock()
                midiout.send_message([0x90, tone, 127])
                tone_old = tone
        #cv2.imshow('frame',mask) #print "mask"
        dis_array_y = []
        for i in range(len(dis_array)):
            dis_array_y.append(dis_array[i][1])
        #print len(dis_array)
        if len(dis_array)>1:
            m = max(dis_array_y) # lowest point (largest distance to top of screen)
            print "Position of lowest point:"
            print m
            positionOfElement = 0
            for i,j in enumerate(dis_array):
                #print j
                if j[1] == m:
                    positionOfElement = i
                    break
            #print "Koordinaten des niedrigsten Punktes, "+str(i)
            #print dis_array[positionOfElement]
        for cnt in contours:
            distance_above_2 = np.mean(cnt[:,:,1])
            #print np.mean(cnt[:,:,1])
            if distance_above_2 == m:
                #print "disntance2==m"
                #print distance_above_2
                #print m
                #print np.mean(cnt[:,:,0])
                #print np.mean(cnt[:,:,1])
                cv2.drawContours(img,[cnt],0,(255,0,0),2)
                #print "Juhu andersfarbiger Punkt."
                cv2.drawContours(mask,[cnt],0,255,-1)
                break
            #detectedDot = np.array([int(dis_array[positionOfElement][0]),int(dis_array[positionOfElement][1])])
            #print detectedDot
            #cv2.drawContours(img,[detectedDot],0,(255,0,0),2) For cnt in countours etc... #to do next.
        else:
            print "\nNo points detected! Please repeat with 'r'"
        print '\nMake sure the blue dot is where the Laserpoint of your hand is. \n If this is not the case, You have to press "r" to REPEAT.\n Otherwise press "ENTER" if you are satisfied\n'
        #print 'Press "n" if you are satisfied, otherwise press "r" to repeat'
        cv2.imshow('frame',img)
        #cv2.startWindowThread()
        b = cv2.waitKey(0)
        b = chr(b) #get the letter from the number returned by waitKey
        #b = raw_input('Make sure the blue dot is where the Laserpoint of your hand is. \n If this is not the case or if no points were detected at all, You have to press "r" to REPEAT.\n Otherwise press "ENTER" if you are satisfied\n')
        if b != 'r':
            # When everything is done, release the capture
            break
    cap.release()
    cv2.waitKey(1)
    cv2.destroyAllWindows()
    cv2.waitKey(1)
    cv2.waitKey(1)
    cv2.waitKey(1)
    cv2.waitKey(1)
    #print "should have worked"
    #cv2.destroyWindow('frame')
    if dis_array:
        #do nothing
        dummy = 0
    else:
        dis_array.append(0)
    return dis_array[positionOfElement]

#--------#
#configure MIDI
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

note_on = [0x90, 60, 127] # channel 1, middle C, velocity 112
note_off = [0x80, 60, 50]
midiout.send_message(note_on)
print "on"
time.sleep(1)
print "off"
midiout.send_message(note_off)
print "did you hear a tone? there is a problem if you didn't."
#--------#

#-- Calibration start -#

print "Calibration started"
allCoords = []
number = 0

for i in range(lasernumber):
    number = number+1
    print "\   \      |      /   /"
    print "(1) (3)   (5)   (7) (9)"
    print "  \   \    |    /   /  "
    print "  (2) (4) (6) (8) (10) "
    print "    \   \  |  /   /    "
    print "Please put your hand at position ("+str(number)+")"
    if i==0:
        ak = raw_input('and press ENTER when you are done')
    else:
        print "and press 'n', when you are done"
    anyKey = cv2.waitKey(0)
    cor1 = readInputUntilRecognition()
    number = number+1
    print "Now please put your hand at position ("+str(number)+")"
    cor2 = readInputUntilRecognition()

    allCoords.append([cor1,cor2])
    drawCalibrationProgress(allCoords) #draw lines and stuff next TODO, nparray and lines for coordinates cv2





a = raw_input('You made it!')











