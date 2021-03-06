# getting started https://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_gui/py_video_display/py_video_display.html

import numpy as np
import cv2
import rtmidi_python as rtmidi
import time
import scipy.misc
import math
import sys

#---- CV2 command overview ---#
#cap = cv2.VideoCapture(device)	# 0 for /dev/video0; 1 for /dev/video1; or a filename.
#print("dimension", cap.get(3), cap.get(4)) #http://docs.opencv.org/modules/highgui/doc/reading_and_writing_images_and_video.html#videocapture-get
#print("fps:", cap.get(5))
#print("codec:", cap.get(6))
#print("bright:", cap.get(10))
#print("cont:", cap.get(11))
#print("sat:", cap.get(12))
#print("rgp:", cap.get(16))

lasernumber = 2
tone_old = 100
tonhoehe_alt = 62
device = 0
dummy = 0
instrument = 62

cap = cv2.VideoCapture(device) # 0 for /dev/video0; 1 for /dev/video1; or a filename.
ret, bild = cap.read()
height = bild.shape[1]
cv2.waitKey(1)

def drawCalibrationProgress(allCoords):
    #print allCoords
    #cap = cv2.VideoCapture(device) # 0 for /dev/video0; 1 for /dev/video1; or a filename.
    ret, bild = cap.read()
    for i in range(len(allCoords)):
        coord11 = int(allCoords[i][0][0])
        coord12 = int(allCoords[i][0][1])
        coord21 = int(allCoords[i][1][0])
        coord22 = int(allCoords[i][1][1])
        #    cv2.drawContours(img,[cnt],0,(255,0,0),2)
        #    cv2.drawContours(mask,[cnt],0,255,-1)
        #    cv2.line(bild, (0,0),(511,511),(255,0,255),3)
        cv2.line(bild, (coord11,coord12),(coord21,coord22),(255,185,15),3)
    cv2.imshow('frame',bild)
    print "All right, press 'AnyKey' if You are satisfied."
    b = cv2.waitKey(0)
    b = chr(b) #get the letter from the number returned by waitKey
    if b=='c':
        sys.exit()

def distanceOfLineAndPoint(coord11,coord12,coord21,coord22,cor1,cor2):
    Dx = coord21-coord11
    Dy = coord22-coord12
    d1 = abs(Dy*cor1-Dx*cor2-coord11*coord22+coord21*coord12)
    linelength = math.sqrt(Dx*Dx+Dy*Dy)
    dis = d1/linelength #This is the shortest distance from the point to the entire line
    # However, we also want to draw this distance.
    # For that we need to know the 'orthogonal' point on the line from where you can draw an orthogonal line to the point
    # We use pythagoras to find it:
    disBeginningOfLineToPoint = math.sqrt((coord11-cor1)*(coord11-cor1)+(coord12-cor2)*(coord12-cor2))
    disEndOfLineToPoint = math.sqrt((coord21-cor1)*(coord21-cor1)+(coord22-cor2)*(coord22-cor2))
    disBeginningOfLineToOrthogonalPoint = math.sqrt(disBeginningOfLineToPoint*disBeginningOfLineToPoint-dis*dis)
    ratio = disBeginningOfLineToOrthogonalPoint/linelength
    #print "ratio: "+str(ratio)
    compare = linelength*linelength-(disEndOfLineToPoint*disEndOfLineToPoint - dis*dis)
    if compare <= 0:
        if disBeginningOfLineToPoint < disEndOfLineToPoint: # These two conditions ensure that the point is nearer to the Beginning
            ratio=0 # If line is too short such that point is outwards of line
                    # just connect to the front point of the line
    if ratio > 1:
        ratio=1 # If the line is too short for drawing an orthogonal path from the point to the line,
                # just connect the point to the endpoint of the line
    coordsOfOrthPoint = [coord11+ratio*(coord21-coord11),coord12+ratio*(coord22-coord12)]
    corOr1 = int(coordsOfOrthPoint[0])
    corOr2 = int(coordsOfOrthPoint[1])
    disToPoint = math.sqrt((corOr1-cor1)*(corOr1-cor1)+(corOr2-cor2)*(corOr2-cor2))
    return disToPoint,corOr1,corOr2

def drawDistanceToNearestLine(allCoords,cor):
    #cap = cv2.VideoCapture(device)
    ret, bild = cap.read()
    cor1 = int(cor[0])
    cor2 = int(cor[1])
    disray = []
    for i in range(len(allCoords)):
        coord11 = int(allCoords[i][0][0])
        coord12 = int(allCoords[i][0][1])
        coord21 = int(allCoords[i][1][0])
        coord22 = int(allCoords[i][1][1])
        cv2.line(bild, (coord11,coord12),(coord21,coord22),(255,185,15),3)
        # The above line is the calibration line.
        # We now want to draw distance to newly detected point.
        # For that we use the distance formula defined above
        dis,corOr1,corOr2 = distanceOfLineAndPoint(coord11,coord12,coord21,coord22,cor1,cor2)
        #print "Distance "+str(i)+": "+str(dis)
        disray.append(dis)
        #cv2.line(bild, (cor1,cor2),(corOr1,corOr2),(255,0,0),5)
    cv2.circle(bild, (cor1,cor2), 8, ( 0, 0, 255 ),-1, 8 ) # draw laserpointPosition
    cv2.imshow('frame',bild)
    #print "\nMinimum: "+str(min(disray))
    abstand = min(disray)
    tonhoehe = np.argmin(disray)*7+instrument
    b = cv2.waitKey(6)
    if b!=-1:
        b = chr(b) #get the letter from the number returned by waitKey
        if b=='c':
            sys.exit()
    return abstand,tonhoehe


def tuneCalibration(b,threshold,contourMin,contourMax):
    #threshold
    if b=='q':
        if threshold > 0:
            threshold = threshold - 5
            print "New threshold: "
            print threshold
    if b=='w':
        if threshold < 255:
            threshold = threshold + 5
            print "New threshold: "
            print threshold
    #contourMin
    if b=='a':
        if contourMin > 0:
            contourMin = contourMin - 5
            print "New Contour-Min: "
            print contourMin
    if b=='s':
        if contourMin < (contourMax-10):
            contourMin = contourMin + 5
            print "New Contour-Min: "
            print contourMin
    #contourMax
    if b=='y':
        if contourMax > contourMin+10:
            contourMax = contourMax - 10
            print "New Contour-Max: "
            print contourMax
    if b=='x':
        contourMax = contourMax + 10
        print "New Contour-Max: "
        print contourMax
    #default values
    if b=='d':
        threshold = 190
        contourMin = 80
        contourMax = 450
        print "Default detection values restored: "
        print "Threshold: "+str(threshold)
        print "Contour-Min: "+str(contourMin)
        print "Contour-Max: "+str(contourMax)
    return threshold, contourMin, contourMax


# Default values for point detection:
threshold = 190
contourMin = 80
contourMax = 450
def readInputUntilRecognition(waiter):
    global threshold,contourMin,contourMax
    #we want to create a mask and display the subtracted background
    m=0 #declaration for later maximum distance of detected point
    positionOfElement = 0 #same thing
    ret, bild = cap.read()
    height = bild.shape[1]
    tone_old = 100
    while(cap.isOpened()):
        ret, bild = cap.read()

        img = bild
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        ret,gray = cv2.threshold(gray,threshold,255,cv2.THRESH_BINARY)
        mask = np.zeros(gray.shape,np.uint8)

        _, contours, hier = cv2.findContours(gray,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
        dis_array = []
        for cnt in contours:
            if contourMin < cv2.contourArea(cnt) < contourMax:
                cv2.drawContours(img,[cnt],0,(0,255,0),2)
                distance_above = np.mean(cnt[:,:,1])
                distance_fromLeft = np.mean(cnt[:,:,0])
                dis_array.append([distance_fromLeft,distance_above])
                cv2.drawContours(mask,[cnt],0,255,-1)
        dis_array_y = []
        for i in range(len(dis_array)):
            dis_array_y.append(dis_array[i][1])
        if len(dis_array)>=1:
            m = max(dis_array_y) # lowest point (largest distance to top of screen)
            positionOfElement = 0
            for i,j in enumerate(dis_array):
                if j[1] == m:
                    positionOfElement = i
                    break
        for cnt in contours:
            distance_above_2 = np.mean(cnt[:,:,1])
            if distance_above_2 == m:
                #Draw differently colored point
                cv2.drawContours(img,[cnt],0,(255,0,0),2)
                cv2.drawContours(mask,[cnt],0,255,-1)
                break
        cv2.imshow('frame',img)
        b = cv2.waitKey(7)
        if b!=-1:
            b = chr(b)
        if b=='c':
            sys.exit()
        if waiter==1:
            if b!=-1:
                threshold, contourMin, contourMax = tuneCalibration(b,threshold,contourMin,contourMax)
            else:
                b = 'r' #repeat loop if user did not enter anything
        else: #go on by default if harp is in play mode (if waiter==0)
            b = 'n'
        if b == 'n':
            if len(dis_array) >= 1: #check if points were detected
                # If yes break loop to send data of points
                break
            else:
                if waiter==1:
                    print "No points detected, try again."
                else:
                    b='n'# don't do anything and repeat loop if no points where detected
    return dis_array[positionOfElement]

#--------#
#configure MIDI
midiout = rtmidi.MidiOut()

for port_name in midiout.ports:
    print port_name

if midiout.ports:
#    midiout.open_virtual_port("My virtual output")
    midiout.open_port(2)
    print "Timidity music port test..."
else:
    midiout.open_virtual_port("My virtual output")

time.sleep(0.1)

note_on = [0x90, 60, 127] # channel 1, middle C, velocity 112
note_off = [0x80, 60, 50]
midiout.send_message(note_on)
#print "on"
time.sleep(1)
#print "off"
midiout.send_message(note_off)
print "Did you hear a tone? There is a problem if you didn't."
#--------#


#-- Calibration start -#

print "\n\nCalibration started"
allCoords = []
number = 0

for i in range(lasernumber):
    number = number+1
    print "\   \      |      /   /"
    print "(1) (3)   (5)   (7) (9)"
    print "  \   \    |    /   /  "
    print "  (2) (4) (6) (8) (10) "
    print "    \   \  |  /   /    "
    if i==0:
        print '\n First You can tune the detection parameters with \n"q","w", "a","s", and "y","x"\n such that the laserpoint is detected correctly at all positions.\n You can press "d" to restore detection values back to default.\n\n When You are done, You have to press "n" everytime you want to mark a point for calibration at a position in the diagram above.\n You can press "c" at any time to interrupt the program.'
        raw_input("\nPress ENTER when you are done.")

        print "\nDefault detection values: "
        print "Threshold: "+str(threshold)
        print "Contour-Min: "+str(contourMin)
        print "Contour-Max: "+str(contourMax)
    print "\nNow put your hand at position ("+str(number)+") and press 'n' when you want to mark for calibration."

    cor1 = readInputUntilRecognition(1)
    number = number+1
    print "Now please put your hand at position ("+str(number)+")"
    cor2 = readInputUntilRecognition(1)

    allCoords.append([cor1,cor2])
    drawCalibrationProgress(allCoords) #draw lines and stuff next TODO, nparray and lines for coordinates cv2

#a = raw_input('Calibration finished.\n\nWe now detect the nearest distance of laserpoints to lines.\n')
print 'Calibration finished.\n\nYou can now start to play the Harp!\nPress "AnyKey" to proceed. Press "c" to interrupt at any time.\n'
ak2 = cv2.waitKey(0)
chan=0
tone=61
tonhoehe_alt = 0
midiout.send_message([0xB0+chan, 07, 127]) # here absolute volume is set.
midiout.send_message([0xC0+chan,69])
while(1):
    ak = cv2.waitKey(2)
    if ak != -1:
        ak = chr(ak)
        if ak == 'c':
            sys.exit()
    cor = readInputUntilRecognition(0)
    if cor:
        abstand,tonhoehe = drawDistanceToNearestLine(allCoords,cor)
        if abstand < 200:
            if tonhoehe != tonhoehe_alt:
                midiout.send_message([0x80+chan,tonhoehe_alt,0])
                midiout.send_message([0x90+chan, tonhoehe, 90])
                tonhoehe_alt = tonhoehe
            corY = int(cor[1])
            amp = int(127.*corY/height)+20
            if amp > 127:
                amp = 127
            midiout.send_message([0xB0+chan, 07, amp]) # here absolute volume is set.
            tonhoehe_alt = tonhoehe
        else:
            midiout.send_message([0x80+chan,tonhoehe,0])
    else:
        midiout.send_message([0x80+chan,tonhoehe,0])
        tonhoehe_alt = 0






