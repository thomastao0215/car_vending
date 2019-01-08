from serial import Serial
import sys,json

navport = Serial('COM6',38400,timeout=0.1)
outport = Serial('COM4',19200,timeout=0.1)

def navrqt(stringcmd):
	navport.write(stringcmd)
	return navport.read_until('\r')
	
def outrqt(stringcmd):
	outport.write(stringcmd+'r')
	return outport.read_until('\r')

def main():
	while 1:
		lines = sys.stdin.readline()
		print outrqt(lines)
		
if __name__=='__main__':
	main()
		
 	