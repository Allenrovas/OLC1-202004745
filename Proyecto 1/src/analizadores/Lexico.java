package analizadores;
import java_cup.runtime.Symbol; 


public class Lexico implements java_cup.runtime.Scanner {
	private final int YY_BUFFER_SIZE = 512;
	private final int YY_F = -1;
	private final int YY_NO_STATE = -1;
	private final int YY_NOT_ACCEPT = 0;
	private final int YY_START = 1;
	private final int YY_END = 2;
	private final int YY_NO_ANCHOR = 4;
	private final int YY_BOL = 65536;
	private final int YY_EOF = 65537;
	private java.io.BufferedReader yy_reader;
	private int yy_buffer_index;
	private int yy_buffer_read;
	private int yy_buffer_start;
	private int yy_buffer_end;
	private char yy_buffer[];
	private int yychar;
	private int yyline;
	private boolean yy_at_bol;
	private int yy_lexical_state;

	public Lexico (java.io.Reader reader) {
		this ();
		if (null == reader) {
			throw (new Error("Error: Bad input stream initializer."));
		}
		yy_reader = new java.io.BufferedReader(reader);
	}

	public Lexico (java.io.InputStream instream) {
		this ();
		if (null == instream) {
			throw (new Error("Error: Bad input stream initializer."));
		}
		yy_reader = new java.io.BufferedReader(new java.io.InputStreamReader(instream));
	}

	private Lexico () {
		yy_buffer = new char[YY_BUFFER_SIZE];
		yy_buffer_read = 0;
		yy_buffer_index = 0;
		yy_buffer_start = 0;
		yy_buffer_end = 0;
		yychar = 0;
		yyline = 0;
		yy_at_bol = true;
		yy_lexical_state = YYINITIAL;
 
    yyline = 1; 
    yychar = 1; 
	}

	private boolean yy_eof_done = false;
	private final int YYINITIAL = 0;
	private final int yy_state_dtrans[] = {
		0
	};
	private void yybegin (int state) {
		yy_lexical_state = state;
	}
	private int yy_advance ()
		throws java.io.IOException {
		int next_read;
		int i;
		int j;

		if (yy_buffer_index < yy_buffer_read) {
			return yy_buffer[yy_buffer_index++];
		}

		if (0 != yy_buffer_start) {
			i = yy_buffer_start;
			j = 0;
			while (i < yy_buffer_read) {
				yy_buffer[j] = yy_buffer[i];
				++i;
				++j;
			}
			yy_buffer_end = yy_buffer_end - yy_buffer_start;
			yy_buffer_start = 0;
			yy_buffer_read = j;
			yy_buffer_index = j;
			next_read = yy_reader.read(yy_buffer,
					yy_buffer_read,
					yy_buffer.length - yy_buffer_read);
			if (-1 == next_read) {
				return YY_EOF;
			}
			yy_buffer_read = yy_buffer_read + next_read;
		}

		while (yy_buffer_index >= yy_buffer_read) {
			if (yy_buffer_index >= yy_buffer.length) {
				yy_buffer = yy_double(yy_buffer);
			}
			next_read = yy_reader.read(yy_buffer,
					yy_buffer_read,
					yy_buffer.length - yy_buffer_read);
			if (-1 == next_read) {
				return YY_EOF;
			}
			yy_buffer_read = yy_buffer_read + next_read;
		}
		return yy_buffer[yy_buffer_index++];
	}
	private void yy_move_end () {
		if (yy_buffer_end > yy_buffer_start &&
		    '\n' == yy_buffer[yy_buffer_end-1])
			yy_buffer_end--;
		if (yy_buffer_end > yy_buffer_start &&
		    '\r' == yy_buffer[yy_buffer_end-1])
			yy_buffer_end--;
	}
	private boolean yy_last_was_cr=false;
	private void yy_mark_start () {
		int i;
		for (i = yy_buffer_start; i < yy_buffer_index; ++i) {
			if ('\n' == yy_buffer[i] && !yy_last_was_cr) {
				++yyline;
			}
			if ('\r' == yy_buffer[i]) {
				++yyline;
				yy_last_was_cr=true;
			} else yy_last_was_cr=false;
		}
		yychar = yychar
			+ yy_buffer_index - yy_buffer_start;
		yy_buffer_start = yy_buffer_index;
	}
	private void yy_mark_end () {
		yy_buffer_end = yy_buffer_index;
	}
	private void yy_to_mark () {
		yy_buffer_index = yy_buffer_end;
		yy_at_bol = (yy_buffer_end > yy_buffer_start) &&
		            ('\r' == yy_buffer[yy_buffer_end-1] ||
		             '\n' == yy_buffer[yy_buffer_end-1] ||
		             2028/*LS*/ == yy_buffer[yy_buffer_end-1] ||
		             2029/*PS*/ == yy_buffer[yy_buffer_end-1]);
	}
	private java.lang.String yytext () {
		return (new java.lang.String(yy_buffer,
			yy_buffer_start,
			yy_buffer_end - yy_buffer_start));
	}
	private int yylength () {
		return yy_buffer_end - yy_buffer_start;
	}
	private char[] yy_double (char buf[]) {
		int i;
		char newbuf[];
		newbuf = new char[2*buf.length];
		for (i = 0; i < buf.length; ++i) {
			newbuf[i] = buf[i];
		}
		return newbuf;
	}
	private final int YY_E_INTERNAL = 0;
	private final int YY_E_MATCH = 1;
	private java.lang.String yy_error_string[] = {
		"Error: Internal error.\n",
		"Error: Unmatched input.\n"
	};
	private void yy_error (int code,boolean fatal) {
		java.lang.System.out.print(yy_error_string[code]);
		java.lang.System.out.flush();
		if (fatal) {
			throw new Error("Fatal Error.\n");
		}
	}
	private int[][] unpackFromString(int size1, int size2, String st) {
		int colonIndex = -1;
		String lengthString;
		int sequenceLength = 0;
		int sequenceInteger = 0;

		int commaIndex;
		String workString;

		int res[][] = new int[size1][size2];
		for (int i= 0; i < size1; i++) {
			for (int j= 0; j < size2; j++) {
				if (sequenceLength != 0) {
					res[i][j] = sequenceInteger;
					sequenceLength--;
					continue;
				}
				commaIndex = st.indexOf(',');
				workString = (commaIndex==-1) ? st :
					st.substring(0, commaIndex);
				st = st.substring(commaIndex+1);
				colonIndex = workString.indexOf(':');
				if (colonIndex == -1) {
					res[i][j]=Integer.parseInt(workString);
					continue;
				}
				lengthString =
					workString.substring(colonIndex+1);
				sequenceLength=Integer.parseInt(lengthString);
				workString=workString.substring(0,colonIndex);
				sequenceInteger=Integer.parseInt(workString);
				res[i][j] = sequenceInteger;
				sequenceLength--;
			}
		}
		return res;
	}
	private int yy_acpt[] = {
		/* 0 */ YY_NOT_ACCEPT,
		/* 1 */ YY_NO_ANCHOR,
		/* 2 */ YY_NO_ANCHOR,
		/* 3 */ YY_NO_ANCHOR,
		/* 4 */ YY_NO_ANCHOR,
		/* 5 */ YY_NO_ANCHOR,
		/* 6 */ YY_NO_ANCHOR,
		/* 7 */ YY_NO_ANCHOR,
		/* 8 */ YY_NO_ANCHOR,
		/* 9 */ YY_NO_ANCHOR,
		/* 10 */ YY_NO_ANCHOR,
		/* 11 */ YY_NO_ANCHOR,
		/* 12 */ YY_NO_ANCHOR,
		/* 13 */ YY_NO_ANCHOR,
		/* 14 */ YY_NO_ANCHOR,
		/* 15 */ YY_NO_ANCHOR,
		/* 16 */ YY_NO_ANCHOR,
		/* 17 */ YY_NO_ANCHOR,
		/* 18 */ YY_NO_ANCHOR,
		/* 19 */ YY_NO_ANCHOR,
		/* 20 */ YY_NO_ANCHOR,
		/* 21 */ YY_NO_ANCHOR,
		/* 22 */ YY_NO_ANCHOR,
		/* 23 */ YY_NO_ANCHOR,
		/* 24 */ YY_NO_ANCHOR,
		/* 25 */ YY_NO_ANCHOR,
		/* 26 */ YY_NO_ANCHOR,
		/* 27 */ YY_NO_ANCHOR,
		/* 28 */ YY_NO_ANCHOR,
		/* 29 */ YY_NO_ANCHOR,
		/* 30 */ YY_NO_ANCHOR,
		/* 31 */ YY_NO_ANCHOR,
		/* 32 */ YY_NO_ANCHOR,
		/* 33 */ YY_NO_ANCHOR,
		/* 34 */ YY_NO_ANCHOR,
		/* 35 */ YY_NO_ANCHOR,
		/* 36 */ YY_NO_ANCHOR,
		/* 37 */ YY_NO_ANCHOR,
		/* 38 */ YY_NO_ANCHOR,
		/* 39 */ YY_NO_ANCHOR,
		/* 40 */ YY_NO_ANCHOR,
		/* 41 */ YY_NO_ANCHOR,
		/* 42 */ YY_NO_ANCHOR,
		/* 43 */ YY_NO_ANCHOR,
		/* 44 */ YY_NO_ANCHOR,
		/* 45 */ YY_NO_ANCHOR,
		/* 46 */ YY_NO_ANCHOR,
		/* 47 */ YY_NO_ANCHOR,
		/* 48 */ YY_NO_ANCHOR,
		/* 49 */ YY_NO_ANCHOR,
		/* 50 */ YY_NO_ANCHOR,
		/* 51 */ YY_NO_ANCHOR,
		/* 52 */ YY_NO_ANCHOR,
		/* 53 */ YY_NO_ANCHOR,
		/* 54 */ YY_NO_ANCHOR,
		/* 55 */ YY_NO_ANCHOR,
		/* 56 */ YY_NO_ANCHOR,
		/* 57 */ YY_NO_ANCHOR,
		/* 58 */ YY_NO_ANCHOR,
		/* 59 */ YY_NO_ANCHOR,
		/* 60 */ YY_NO_ANCHOR,
		/* 61 */ YY_NO_ANCHOR,
		/* 62 */ YY_NO_ANCHOR,
		/* 63 */ YY_NO_ANCHOR,
		/* 64 */ YY_NO_ANCHOR,
		/* 65 */ YY_NO_ANCHOR,
		/* 66 */ YY_NO_ANCHOR,
		/* 67 */ YY_NOT_ACCEPT,
		/* 68 */ YY_NO_ANCHOR,
		/* 69 */ YY_NO_ANCHOR,
		/* 70 */ YY_NOT_ACCEPT,
		/* 71 */ YY_NO_ANCHOR,
		/* 72 */ YY_NOT_ACCEPT,
		/* 73 */ YY_NO_ANCHOR,
		/* 74 */ YY_NOT_ACCEPT,
		/* 75 */ YY_NO_ANCHOR,
		/* 76 */ YY_NOT_ACCEPT,
		/* 77 */ YY_NO_ANCHOR,
		/* 78 */ YY_NOT_ACCEPT,
		/* 79 */ YY_NO_ANCHOR,
		/* 80 */ YY_NOT_ACCEPT,
		/* 81 */ YY_NO_ANCHOR,
		/* 82 */ YY_NOT_ACCEPT,
		/* 83 */ YY_NO_ANCHOR,
		/* 84 */ YY_NOT_ACCEPT,
		/* 85 */ YY_NO_ANCHOR,
		/* 86 */ YY_NOT_ACCEPT,
		/* 87 */ YY_NO_ANCHOR,
		/* 88 */ YY_NOT_ACCEPT,
		/* 89 */ YY_NO_ANCHOR,
		/* 90 */ YY_NOT_ACCEPT,
		/* 91 */ YY_NO_ANCHOR,
		/* 92 */ YY_NOT_ACCEPT,
		/* 93 */ YY_NO_ANCHOR,
		/* 94 */ YY_NOT_ACCEPT,
		/* 95 */ YY_NO_ANCHOR,
		/* 96 */ YY_NOT_ACCEPT,
		/* 97 */ YY_NOT_ACCEPT,
		/* 98 */ YY_NOT_ACCEPT,
		/* 99 */ YY_NOT_ACCEPT,
		/* 100 */ YY_NOT_ACCEPT,
		/* 101 */ YY_NOT_ACCEPT,
		/* 102 */ YY_NOT_ACCEPT,
		/* 103 */ YY_NOT_ACCEPT,
		/* 104 */ YY_NOT_ACCEPT,
		/* 105 */ YY_NOT_ACCEPT,
		/* 106 */ YY_NOT_ACCEPT,
		/* 107 */ YY_NOT_ACCEPT,
		/* 108 */ YY_NOT_ACCEPT,
		/* 109 */ YY_NOT_ACCEPT,
		/* 110 */ YY_NOT_ACCEPT,
		/* 111 */ YY_NOT_ACCEPT,
		/* 112 */ YY_NOT_ACCEPT,
		/* 113 */ YY_NOT_ACCEPT,
		/* 114 */ YY_NOT_ACCEPT,
		/* 115 */ YY_NOT_ACCEPT,
		/* 116 */ YY_NOT_ACCEPT,
		/* 117 */ YY_NOT_ACCEPT,
		/* 118 */ YY_NOT_ACCEPT,
		/* 119 */ YY_NOT_ACCEPT,
		/* 120 */ YY_NOT_ACCEPT,
		/* 121 */ YY_NOT_ACCEPT,
		/* 122 */ YY_NOT_ACCEPT,
		/* 123 */ YY_NOT_ACCEPT,
		/* 124 */ YY_NOT_ACCEPT,
		/* 125 */ YY_NOT_ACCEPT,
		/* 126 */ YY_NOT_ACCEPT,
		/* 127 */ YY_NOT_ACCEPT,
		/* 128 */ YY_NOT_ACCEPT,
		/* 129 */ YY_NOT_ACCEPT,
		/* 130 */ YY_NOT_ACCEPT,
		/* 131 */ YY_NOT_ACCEPT,
		/* 132 */ YY_NOT_ACCEPT,
		/* 133 */ YY_NOT_ACCEPT,
		/* 134 */ YY_NOT_ACCEPT,
		/* 135 */ YY_NOT_ACCEPT,
		/* 136 */ YY_NOT_ACCEPT,
		/* 137 */ YY_NOT_ACCEPT,
		/* 138 */ YY_NOT_ACCEPT,
		/* 139 */ YY_NOT_ACCEPT,
		/* 140 */ YY_NOT_ACCEPT,
		/* 141 */ YY_NOT_ACCEPT,
		/* 142 */ YY_NOT_ACCEPT,
		/* 143 */ YY_NOT_ACCEPT,
		/* 144 */ YY_NOT_ACCEPT,
		/* 145 */ YY_NOT_ACCEPT,
		/* 146 */ YY_NOT_ACCEPT,
		/* 147 */ YY_NOT_ACCEPT,
		/* 148 */ YY_NOT_ACCEPT,
		/* 149 */ YY_NOT_ACCEPT,
		/* 150 */ YY_NOT_ACCEPT,
		/* 151 */ YY_NOT_ACCEPT,
		/* 152 */ YY_NOT_ACCEPT,
		/* 153 */ YY_NOT_ACCEPT,
		/* 154 */ YY_NOT_ACCEPT,
		/* 155 */ YY_NOT_ACCEPT,
		/* 156 */ YY_NOT_ACCEPT,
		/* 157 */ YY_NOT_ACCEPT,
		/* 158 */ YY_NOT_ACCEPT,
		/* 159 */ YY_NOT_ACCEPT,
		/* 160 */ YY_NOT_ACCEPT,
		/* 161 */ YY_NOT_ACCEPT,
		/* 162 */ YY_NOT_ACCEPT,
		/* 163 */ YY_NOT_ACCEPT,
		/* 164 */ YY_NOT_ACCEPT,
		/* 165 */ YY_NOT_ACCEPT,
		/* 166 */ YY_NOT_ACCEPT,
		/* 167 */ YY_NOT_ACCEPT,
		/* 168 */ YY_NOT_ACCEPT,
		/* 169 */ YY_NOT_ACCEPT,
		/* 170 */ YY_NOT_ACCEPT,
		/* 171 */ YY_NOT_ACCEPT,
		/* 172 */ YY_NOT_ACCEPT,
		/* 173 */ YY_NOT_ACCEPT,
		/* 174 */ YY_NOT_ACCEPT,
		/* 175 */ YY_NOT_ACCEPT,
		/* 176 */ YY_NOT_ACCEPT,
		/* 177 */ YY_NOT_ACCEPT,
		/* 178 */ YY_NOT_ACCEPT,
		/* 179 */ YY_NOT_ACCEPT,
		/* 180 */ YY_NOT_ACCEPT,
		/* 181 */ YY_NOT_ACCEPT,
		/* 182 */ YY_NOT_ACCEPT,
		/* 183 */ YY_NOT_ACCEPT,
		/* 184 */ YY_NOT_ACCEPT,
		/* 185 */ YY_NOT_ACCEPT,
		/* 186 */ YY_NOT_ACCEPT,
		/* 187 */ YY_NOT_ACCEPT,
		/* 188 */ YY_NOT_ACCEPT,
		/* 189 */ YY_NOT_ACCEPT,
		/* 190 */ YY_NOT_ACCEPT,
		/* 191 */ YY_NOT_ACCEPT,
		/* 192 */ YY_NOT_ACCEPT,
		/* 193 */ YY_NOT_ACCEPT,
		/* 194 */ YY_NOT_ACCEPT,
		/* 195 */ YY_NOT_ACCEPT,
		/* 196 */ YY_NOT_ACCEPT,
		/* 197 */ YY_NOT_ACCEPT,
		/* 198 */ YY_NOT_ACCEPT,
		/* 199 */ YY_NOT_ACCEPT,
		/* 200 */ YY_NOT_ACCEPT,
		/* 201 */ YY_NOT_ACCEPT,
		/* 202 */ YY_NOT_ACCEPT,
		/* 203 */ YY_NOT_ACCEPT,
		/* 204 */ YY_NOT_ACCEPT,
		/* 205 */ YY_NOT_ACCEPT,
		/* 206 */ YY_NOT_ACCEPT,
		/* 207 */ YY_NOT_ACCEPT,
		/* 208 */ YY_NOT_ACCEPT,
		/* 209 */ YY_NO_ANCHOR,
		/* 210 */ YY_NOT_ACCEPT,
		/* 211 */ YY_NOT_ACCEPT,
		/* 212 */ YY_NOT_ACCEPT,
		/* 213 */ YY_NOT_ACCEPT,
		/* 214 */ YY_NO_ANCHOR,
		/* 215 */ YY_NOT_ACCEPT,
		/* 216 */ YY_NOT_ACCEPT,
		/* 217 */ YY_NOT_ACCEPT,
		/* 218 */ YY_NOT_ACCEPT,
		/* 219 */ YY_NOT_ACCEPT,
		/* 220 */ YY_NOT_ACCEPT,
		/* 221 */ YY_NOT_ACCEPT,
		/* 222 */ YY_NOT_ACCEPT,
		/* 223 */ YY_NOT_ACCEPT,
		/* 224 */ YY_NOT_ACCEPT,
		/* 225 */ YY_NOT_ACCEPT,
		/* 226 */ YY_NOT_ACCEPT,
		/* 227 */ YY_NOT_ACCEPT,
		/* 228 */ YY_NOT_ACCEPT,
		/* 229 */ YY_NOT_ACCEPT,
		/* 230 */ YY_NOT_ACCEPT,
		/* 231 */ YY_NOT_ACCEPT,
		/* 232 */ YY_NOT_ACCEPT,
		/* 233 */ YY_NOT_ACCEPT,
		/* 234 */ YY_NOT_ACCEPT,
		/* 235 */ YY_NOT_ACCEPT,
		/* 236 */ YY_NOT_ACCEPT,
		/* 237 */ YY_NOT_ACCEPT,
		/* 238 */ YY_NOT_ACCEPT,
		/* 239 */ YY_NOT_ACCEPT,
		/* 240 */ YY_NOT_ACCEPT,
		/* 241 */ YY_NOT_ACCEPT,
		/* 242 */ YY_NOT_ACCEPT,
		/* 243 */ YY_NOT_ACCEPT,
		/* 244 */ YY_NOT_ACCEPT,
		/* 245 */ YY_NOT_ACCEPT,
		/* 246 */ YY_NO_ANCHOR,
		/* 247 */ YY_NO_ANCHOR,
		/* 248 */ YY_NOT_ACCEPT,
		/* 249 */ YY_NOT_ACCEPT,
		/* 250 */ YY_NOT_ACCEPT,
		/* 251 */ YY_NOT_ACCEPT,
		/* 252 */ YY_NOT_ACCEPT,
		/* 253 */ YY_NOT_ACCEPT,
		/* 254 */ YY_NOT_ACCEPT,
		/* 255 */ YY_NOT_ACCEPT,
		/* 256 */ YY_NOT_ACCEPT,
		/* 257 */ YY_NOT_ACCEPT,
		/* 258 */ YY_NOT_ACCEPT,
		/* 259 */ YY_NOT_ACCEPT,
		/* 260 */ YY_NOT_ACCEPT,
		/* 261 */ YY_NOT_ACCEPT,
		/* 262 */ YY_NOT_ACCEPT,
		/* 263 */ YY_NOT_ACCEPT,
		/* 264 */ YY_NOT_ACCEPT,
		/* 265 */ YY_NOT_ACCEPT,
		/* 266 */ YY_NOT_ACCEPT,
		/* 267 */ YY_NOT_ACCEPT,
		/* 268 */ YY_NOT_ACCEPT,
		/* 269 */ YY_NOT_ACCEPT,
		/* 270 */ YY_NOT_ACCEPT,
		/* 271 */ YY_NOT_ACCEPT,
		/* 272 */ YY_NOT_ACCEPT,
		/* 273 */ YY_NOT_ACCEPT,
		/* 274 */ YY_NOT_ACCEPT,
		/* 275 */ YY_NOT_ACCEPT,
		/* 276 */ YY_NOT_ACCEPT,
		/* 277 */ YY_NOT_ACCEPT,
		/* 278 */ YY_NOT_ACCEPT,
		/* 279 */ YY_NOT_ACCEPT,
		/* 280 */ YY_NOT_ACCEPT
	};
	private int yy_cmap[] = unpackFromString(1,65538,
"38:9,34,33,38:2,34,38:18,34,38,37,38:4,39,25,26,29,27,32,28,36,30,35:10,38," +
"24,38,31,41,38:2,5,10,14,4,2,7,19,21,15,23,40,8,16,11,6,12,22,3,9,13,20,1,4" +
"0:2,17,40,38:4,18,38,5,10,14,4,2,7,19,21,15,23,40,8,16,11,6,12,22,3,9,13,20" +
",1,40:2,17,40,38:65413,0:2")[0];

	private int yy_rmap[] = unpackFromString(1,281,
"0,1,2,1:4,3,1,4,1:3,5,6,1:3,7,1,8,1,9,1:2,10,1:7,11,12,13,1:15,14,1:15,15,1" +
"6,17,18,19,20,21,22,23,24,1,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40" +
",41,42,43,44,45,46,47,48,49,10,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64" +
",65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89" +
",90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110," +
"111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129" +
",130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,14" +
"8,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,1" +
"67,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185," +
"186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204" +
",205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,22" +
"3,224,225,226")[0];

	private int yy_nxt[][] = unpackFromString(227,42,
"1,2,68,209,246,71,73,75,77,79,81,214,83,77,247,85,87,77,89,77:2,91,77:2,3,4" +
",5,6,7,8,9,10,11,12,13,14,77,93,77,95,77:2,-1:44,67,-1:80,17,-1,18:28,69,18" +
":3,-1,18:3,-1,18:4,-1:34,13,-1:42,14,103,-1:6,18:32,-1,18:3,-1,18:4,-1:18,1" +
"25,-1:41,128,-1:58,25,-1:24,162,-1:41,280,-1:41,163,-1:41,240,-1:26,106,-1:" +
"47,70,-1,72,-1:11,74,-1:19,69:28,18:2,69:2,120,69:3,120,69:4,-1:18,107,-1:3" +
"4,78,-1:43,216,-1:31,15,-1:14,80,-1:25,108,-1:44,82,-1:9,84,-1:4,86,-1:33,1" +
"09,248,-1:32,19,-1:39,88,-1:12,16,-1:35,110,-1:38,90,-1:43,111,-1:38,210,21" +
"2,-1:46,20,-1:41,96,-1:4,97,-1:36,217,-1:32,98,-1:2,99,100,-1:8,213,-1:45,1" +
"12,-1:23,101:17,-1,101:5,-1:11,101,-1:4,101,-1:7,113,-1:40,102,-1:49,21,-1:" +
"29,104:32,-1,104:3,-1,104:4,-1:11,22,-1:4,115,-1:26,105:17,-1,105:5,-1:16,1" +
"05,-1:15,116,274,-1:3,267,-1:34,220,-1:40,117,-1,221,-1:45,251,-1:28,23,-1:" +
"38,101:17,24,101:5,-1:11,101,-1:4,101,-1:10,119,-1:4,249,-1:28,104:32,-1,10" +
"4:3,26,104:4,-1:39,27,-1:6,121,-1:41,122,-1:10,123,-1:40,219,-1:29,223,-1:5" +
"4,28,-1:35,124,-1:52,126,-1:29,127,-1:38,29,-1:42,30,-1:38,225,-1:44,129,-1" +
":46,253,-1:43,132,-1:29,120:28,134,-1,120:11,-1:5,226,-1:51,135,-1:45,136,-" +
"1:28,31,-1:42,227,-1,142,-1:2,143,-1:3,144,-1:36,32,-1:32,229,-1:40,256,-1:" +
"10,268,-1:32,33,-1:42,149,-1:40,34,-1:43,35,-1:39,36,-1:68,37,-1:18,270,-1:" +
"54,263,-1:35,232,-1:40,265,-1:43,152,-1:37,266,-1:48,153,-1:25,155,-1:12,38" +
",-1:31,231,-1:38,156,-1:12,257,-1:32,157,-1:51,275,-1:31,39,-1:44,161,-1:38" +
",40,-1:38,234,-1:40,164,-1:42,41,-1:52,235,-1:38,169,-1:49,170,-1:35,259,-1" +
":39,42,-1:41,43,-1:45,173,-1:34,264,-1:38,174,-1:42,176,-1:57,237,-1:22,178" +
",-1:46,44,-1:42,45,-1:35,46,-1:41,47,-1:52,180,-1:47,181,-1:26,48,-1:47,183" +
",-1:35,49,-1:39,50,-1:41,51,-1:56,238,-1:32,52,-1:38,53,-1:37,187,-1:54,188" +
",-1:37,54,-1:34,189,-1:50,190,-1:31,55,-1:54,191,-1:27,56,-1:50,194,-1:36,1" +
"95,-1:41,57,-1:38,242,-1:40,243,-1:44,196,-1:55,198,-1:35,199,-1:39,58,-1:3" +
"8,59,-1:41,60,-1:53,244,-1:23,61,-1:44,245,-1:45,62,-1:35,203,-1:44,207,-1:" +
"43,63,-1:41,64,-1:48,208,-1:35,65,-1:38,66,-1:37,76,-1:42,114,-1:56,215,-1:" +
"36,218,-1:30,118,-1:45,92,-1:43,261,-1:39,222,-1:49,224,-1:29,252,-1:59,138" +
",-1:24,262,-1:44,130,-1:46,137,-1:43,139,-1:43,145,-1:28,146,-1:43,151,-1:5" +
"7,154,-1:35,159,-1:32,158,-1:52,233,-1:28,171,-1:40,166,-1:54,175,-1:31,177" +
",-1:42,276,-1:38,179,-1:58,186,-1:36,193,-1:39,192,-1:39,197,-1:33,200,-1:4" +
"3,201,-1:49,202,-1:33,204,-1:39,206,-1:40,211,-1:45,94,-1:41,250,-1:37,133," +
"-1:42,140,-1:44,131,-1:46,228,-1:43,150,-1:43,147,-1:28,148,-1:44,160,-1:38" +
",172,-1:44,185,-1:42,182,-1:40,205,-1:42,141,-1:50,230,-1:31,165,-1:42,184," +
"-1:40,167,-1:41,168,-1:39,255,-1:43,269,-1:39,258,-1:40,236,-1:50,239,-1:43" +
",241,-1:48,260,-1:35,254,-1:29,271,-1:50,272,-1:49,273,-1:37,277,-1:44,278," +
"-1:29,279,-1:35");

	public java_cup.runtime.Symbol next_token ()
		throws java.io.IOException {
		int yy_lookahead;
		int yy_anchor = YY_NO_ANCHOR;
		int yy_state = yy_state_dtrans[yy_lexical_state];
		int yy_next_state = YY_NO_STATE;
		int yy_last_accept_state = YY_NO_STATE;
		boolean yy_initial = true;
		int yy_this_accept;

		yy_mark_start();
		yy_this_accept = yy_acpt[yy_state];
		if (YY_NOT_ACCEPT != yy_this_accept) {
			yy_last_accept_state = yy_state;
			yy_mark_end();
		}
		while (true) {
			if (yy_initial && yy_at_bol) yy_lookahead = YY_BOL;
			else yy_lookahead = yy_advance();
			yy_next_state = YY_F;
			yy_next_state = yy_nxt[yy_rmap[yy_state]][yy_cmap[yy_lookahead]];
			if (YY_EOF == yy_lookahead && true == yy_initial) {
				return null;
			}
			if (YY_F != yy_next_state) {
				yy_state = yy_next_state;
				yy_initial = false;
				yy_this_accept = yy_acpt[yy_state];
				if (YY_NOT_ACCEPT != yy_this_accept) {
					yy_last_accept_state = yy_state;
					yy_mark_end();
				}
			}
			else {
				if (YY_NO_STATE == yy_last_accept_state) {
					throw (new Error("Lexical Error: Unmatched Input."));
				}
				else {
					yy_anchor = yy_acpt[yy_last_accept_state];
					if (0 != (YY_END & yy_anchor)) {
						yy_move_end();
					}
					yy_to_mark();
					switch (yy_last_accept_state) {
					case 1:
						
					case -2:
						break;
					case 2:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -3:
						break;
					case 3:
						{System.out.println("se econtro un punto y coma"); return new Symbol(sym.puntocoma,yyline,yychar, yytext());}
					case -4:
						break;
					case 4:
						{System.out.println("se econtro un parentesis izquierdo");  return new Symbol(sym.parAbierto,yyline,yychar, yytext());}
					case -5:
						break;
					case 5:
						{System.out.println("se econtro un parentesis derecho"); return new Symbol(sym.parCerrar,yyline,yychar, yytext());}
					case -6:
						break;
					case 6:
						{System.out.println("se econtro un mas"); return new Symbol(sym.mas,yyline,yychar, yytext());}
					case -7:
						break;
					case 7:
						{System.out.println("se econtro un menos"); return new Symbol(sym.menos,yyline,yychar, yytext());}
					case -8:
						break;
					case 8:
						{System.out.println("se econtro un por"); return new Symbol(sym.por,yyline,yychar, yytext());}
					case -9:
						break;
					case 9:
						{System.out.println("se econtro un dividido"); return new Symbol(sym.dividido,yyline,yychar, yytext());}
					case -10:
						break;
					case 10:
						{System.out.println("se econtro un igual"); return new Symbol(sym.igual,yyline,yychar, yytext());}
					case -11:
						break;
					case 11:
						{System.out.println("se econtro una coma"); return new Symbol(sym.coma,yyline,yychar, yytext());}
					case -12:
						break;
					case 12:
						{yychar=1;}
					case -13:
						break;
					case 13:
						{}
					case -14:
						break;
					case 14:
						{System.out.println("se econtro un entero");  return new Symbol(sym.entero,yyline,yychar, yytext());}
					case -15:
						break;
					case 15:
						{System.out.println("se encontro la palabra reservada or"); return new Symbol(sym.or,yyline,yychar,yytext());}
					case -16:
						break;
					case 16:
						{System.out.println("se encontro la palabra reservada si"); return new Symbol(sym.si,yyline,yychar,yytext());}
					case -17:
						break;
					case 17:
						{System.out.println("se econtro una asignacion"); return new Symbol(sym.asignacionSimbolo,yyline,yychar, yytext());}
					case -18:
						break;
					case 18:
						{System.out.println("se econtro un comentarioLineal"); return new Symbol(sym.comentario_linea,yyline,yychar, yytext());}
					case -19:
						break;
					case 19:
						{System.out.println("se encontro la palabra reservada and"); return new Symbol(sym.es_diferente,yyline,yychar,yytext());}
					case -20:
						break;
					case 20:
						{System.out.println("se encontro la palabra reservada fin"); return new Symbol(sym.fin,yyline,yychar,yytext());}
					case -21:
						break;
					case 21:
						{System.out.println("se encontro la palabra reservada not"); return new Symbol(sym.not,yyline,yychar,yytext());}
					case -22:
						break;
					case 22:
						{System.out.println("se encontro la palabra reservada con"); return new Symbol(sym.con,yyline,yychar,yytext());}
					case -23:
						break;
					case 23:
						{System.out.println("se encontro la palabra reservada mod"); return new Symbol(sym.mod,yyline,yychar,yytext());}
					case -24:
						break;
					case 24:
						{System.out.println("se econtro una variable"); return new Symbol(sym.variable,yyline,yychar, yytext());}
					case -25:
						break;
					case 25:
						{System.out.println("se econtro un decimal"); return new Symbol(sym.decimal,yyline,yychar, yytext());}
					case -26:
						break;
					case 26:
						{System.out.println("se econtro una cadena"); return new Symbol(sym.cadena,yyline,yychar, yytext());}
					case -27:
						break;
					case 27:
						{System.out.println("se econtro un caracter"); return new Symbol(sym.caracter,yyline,yychar, yytext());}
					case -28:
						break;
					case 28:
						{System.out.println("se encontro la palabra reservada o_si"); return new Symbol(sym.o_si,yyline,yychar,yytext());}
					case -29:
						break;
					case 29:
						{System.out.println("se encontro la palabra reservada para"); return new Symbol(sym.para,yyline,yychar,yytext());}
					case -30:
						break;
					case 30:
						{System.out.println("se encontro la palabra reservada como"); return new Symbol(sym.como,yyline,yychar,yytext());}
					case -31:
						break;
					case 31:
						{System.out.println("se encontro la palabra reservada Falso"); return new Symbol(sym.falso,yyline,yychar,yytext());}
					case -32:
						break;
					case 32:
						{System.out.println("se encontro la palabra reservada segun"); return new Symbol(sym.segun,yyline,yychar,yytext());}
					case -33:
						break;
					case 33:
						{System.out.println("se encontro la palabra reservada menor"); return new Symbol(sym.menor,yyline,yychar,yytext());}
					case -34:
						break;
					case 34:
						{System.out.println("se encontro la palabra reservada mayor"); return new Symbol(sym.mayor,yyline,yychar,yytext());}
					case -35:
						break;
					case 35:
						{System.out.println("se encontro la palabra reservada hasta"); return new Symbol(sym.hasta,yyline,yychar,yytext());}
					case -36:
						break;
					case 36:
						{System.out.println("se encontro la palabra reservada hacer"); return new Symbol(sym.hacer,yyline,yychar,yytext());}
					case -37:
						break;
					case 37:
						{System.out.println("se econtro un comentario Multilinea"); return new Symbol(sym.comentario_multilinea,yyline,yychar, yytext());}
					case -38:
						break;
					case 38:
						{System.out.println("se encontro la palabra reservada fin_si"); return new Symbol(sym.fin_si,yyline,yychar,yytext());}
					case -39:
						break;
					case 39:
						{System.out.println("se encontro la palabra reservada inicio"); return new Symbol(sym.inicio,yyline,yychar,yytext());}
					case -40:
						break;
					case 40:
						{System.out.println("se encontro la palabra reservada metodo"); return new Symbol(sym.metodo,yyline,yychar,yytext());}
					case -41:
						break;
					case 41:
						{System.out.println("se encontro la palabra reservada repetir"); return new Symbol(sym.repetir,yyline,yychar,yytext());}
					case -42:
						break;
					case 42:
						{System.out.println("se encontro la palabra reservada funcion"); return new Symbol(sym.funcion,yyline,yychar,yytext());}
					case -43:
						break;
					case 43:
						{System.out.println("se encontro la palabra reservada Boolean"); return new Symbol(sym.boolean,yyline,yychar,yytext());}
					case -44:
						break;
					case 44:
						{System.out.println("se encontro la palabra reservada es_igual"); return new Symbol(sym.es_igual,yyline,yychar,yytext());}
					case -45:
						break;
					case 45:
						{System.out.println("se encontro la palabra reservada entonces"); return new Symbol(sym.entonces,yyline,yychar,yytext());}
					case -46:
						break;
					case 46:
						{System.out.println("se encontro la palabra reservada ejecutar"); return new Symbol(sym.ejecutar,yyline,yychar,yytext());}
					case -47:
						break;
					case 47:
						{System.out.println("se encontro la palabra reservada retornar"); return new Symbol(sym.retornar,yyline,yychar,yytext());}
					case -48:
						break;
					case 48:
						{System.out.println("se encontro la palabra reservada fin_para"); return new Symbol(sym.fin_para,yyline,yychar,yytext());}
					case -49:
						break;
					case 49:
						{System.out.println("se encontro la palabra reservada potencia"); return new Symbol(sym.potencia,yyline,yychar,yytext());}
					case -50:
						break;
					case 50:
						{System.out.println("se encontro la palabra reservada ingresar"); return new Symbol(sym.ingresar,yyline,yychar,yytext());}
					case -51:
						break;
					case 51:
						{System.out.println("se encontro la palabra reservada imprimir"); return new Symbol(sym.imprimir,yyline,yychar,yytext());}
					case -52:
						break;
					case 52:
						{System.out.println("se encontro la palabra reservada mientras"); return new Symbol(sym.mientras,yyline,yychar,yytext());}
					case -53:
						break;
					case 53:
						{System.out.println("se encontro la palabra reservada Verdadero"); return new Symbol(sym.verdadero,yyline,yychar,yytext());}
					case -54:
						break;
					case 54:
						{System.out.println("se encontro la palabra reservada fin_segun"); return new Symbol(sym.fin_segun,yyline,yychar,yytext());}
					case -55:
						break;
					case 55:
						{System.out.println("se encontro la palabra reservada con_valor"); return new Symbol(sym.con_valor,yyline,yychar,yytext());}
					case -56:
						break;
					case 56:
						{System.out.println("se encontro la palabra reservada hasta_que"); return new Symbol(sym.hasta_que,yyline,yychar,yytext());}
					case -57:
						break;
					case 57:
						{System.out.println("se encontro la palabra reservada fin_metodo"); return new Symbol(sym.fin_metodo,yyline,yychar,yytext());}
					case -58:
						break;
					case 58:
						{System.out.println("se encontro la palabra reservada fin_funcion"); return new Symbol(sym.fin_funcion,yyline,yychar,yytext());}
					case -59:
						break;
					case 59:
						{System.out.println("se encontro la palabra reservada incremental"); return new Symbol(sym.incremental,yyline,yychar,yytext());}
					case -60:
						break;
					case 60:
						{System.out.println("se encontro la palabra reservada imprimir_nl"); return new Symbol(sym.imprimir_nl,yyline,yychar,yytext());}
					case -61:
						break;
					case 61:
						{System.out.println("se encontro la palabra reservada es_diferente"); return new Symbol(sym.es_diferente,yyline,yychar,yytext());}
					case -62:
						break;
					case 62:
						{System.out.println("se encontro la palabra reservada fin_mientras"); return new Symbol(sym.fin_mientras,yyline,yychar,yytext());}
					case -63:
						break;
					case 63:
						{System.out.println("se encontro la palabra reservada menor_o_igual"); return new Symbol(sym.menor_o_igual,yyline,yychar,yytext());}
					case -64:
						break;
					case 64:
						{System.out.println("se encontro la palabra reservada mayor_o_igual"); return new Symbol(sym.mayour_o_igual,yyline,yychar,yytext());}
					case -65:
						break;
					case 65:
						{System.out.println("se encontro la palabra reservada con_parametros"); return new Symbol(sym.con_parametros,yyline,yychar,yytext());}
					case -66:
						break;
					case 66:
						{System.out.println("se encontro la palabra reservada de_lo_contrario"); return new Symbol(sym.de_lo_contrario,yyline,yychar,yytext());}
					case -67:
						break;
					case 68:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -68:
						break;
					case 69:
						{System.out.println("se econtro un comentarioLineal"); return new Symbol(sym.comentario_linea,yyline,yychar, yytext());}
					case -69:
						break;
					case 71:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -70:
						break;
					case 73:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -71:
						break;
					case 75:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -72:
						break;
					case 77:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -73:
						break;
					case 79:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -74:
						break;
					case 81:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -75:
						break;
					case 83:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -76:
						break;
					case 85:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -77:
						break;
					case 87:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -78:
						break;
					case 89:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -79:
						break;
					case 91:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -80:
						break;
					case 93:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -81:
						break;
					case 95:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -82:
						break;
					case 209:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -83:
						break;
					case 214:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -84:
						break;
					case 246:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -85:
						break;
					case 247:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
}
					case -86:
						break;
					default:
						yy_error(YY_E_INTERNAL,false);
					case -1:
					}
					yy_initial = true;
					yy_state = yy_state_dtrans[yy_lexical_state];
					yy_next_state = YY_NO_STATE;
					yy_last_accept_state = YY_NO_STATE;
					yy_mark_start();
					yy_this_accept = yy_acpt[yy_state];
					if (YY_NOT_ACCEPT != yy_this_accept) {
						yy_last_accept_state = yy_state;
						yy_mark_end();
					}
				}
			}
		}
	}
}
