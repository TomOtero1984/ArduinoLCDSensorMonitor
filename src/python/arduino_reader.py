import serial

def read_data(ser):
    start_flag = False
    end_flag = False
    data_found = False
    record = False
    data = ""
    error_flag = False
    while(not data_found or error_flag):
        # Get data
        s = ser.read(1).decode("utf-8")
        
        # Check for start or end
        if s == "}" and start_flag: 
            end_flag = True
        elif s == "{" and not start_flag:
            start_flag = True
            record = True
        elif s == "{" and start_flag:
            error_flag = True
        
        # Record data
        if record:
            data = data + s
                
        # Check for end of loop
        if start_flag and end_flag:
            data_found = True
    return data


def main():
    ser = serial.Serial('COM6', 9600)

    try:
        while(True):
            print(read_data(ser))
    except KeyboardInterrupt:
        print("EXIT")
    finally:
        ser.close()


if __name__ == "__main__":
    main()