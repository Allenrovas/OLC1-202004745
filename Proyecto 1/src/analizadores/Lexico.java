package analizadores;
import java_cup.runtime.Symbol; 
import java.util.ArrayList;
import principal.*;


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
		/* 67 */ YY_NO_ANCHOR,
		/* 68 */ YY_NO_ANCHOR,
		/* 69 */ YY_NO_ANCHOR,
		/* 70 */ YY_NO_ANCHOR,
		/* 71 */ YY_NO_ANCHOR,
		/* 72 */ YY_NO_ANCHOR,
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
		/* 97 */ YY_NO_ANCHOR,
		/* 98 */ YY_NOT_ACCEPT,
		/* 99 */ YY_NO_ANCHOR,
		/* 100 */ YY_NOT_ACCEPT,
		/* 101 */ YY_NO_ANCHOR,
		/* 102 */ YY_NOT_ACCEPT,
		/* 103 */ YY_NO_ANCHOR,
		/* 104 */ YY_NOT_ACCEPT,
		/* 105 */ YY_NO_ANCHOR,
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
		/* 209 */ YY_NOT_ACCEPT,
		/* 210 */ YY_NOT_ACCEPT,
		/* 211 */ YY_NOT_ACCEPT,
		/* 212 */ YY_NOT_ACCEPT,
		/* 213 */ YY_NOT_ACCEPT,
		/* 214 */ YY_NOT_ACCEPT,
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
		/* 237 */ YY_NO_ANCHOR,
		/* 238 */ YY_NOT_ACCEPT,
		/* 239 */ YY_NOT_ACCEPT,
		/* 240 */ YY_NOT_ACCEPT,
		/* 241 */ YY_NOT_ACCEPT,
		/* 242 */ YY_NOT_ACCEPT,
		/* 243 */ YY_NOT_ACCEPT,
		/* 244 */ YY_NOT_ACCEPT,
		/* 245 */ YY_NOT_ACCEPT,
		/* 246 */ YY_NOT_ACCEPT,
		/* 247 */ YY_NOT_ACCEPT,
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
		/* 278 */ YY_NO_ANCHOR,
		/* 279 */ YY_NOT_ACCEPT,
		/* 280 */ YY_NOT_ACCEPT,
		/* 281 */ YY_NOT_ACCEPT,
		/* 282 */ YY_NOT_ACCEPT,
		/* 283 */ YY_NOT_ACCEPT,
		/* 284 */ YY_NOT_ACCEPT,
		/* 285 */ YY_NOT_ACCEPT,
		/* 286 */ YY_NOT_ACCEPT,
		/* 287 */ YY_NOT_ACCEPT,
		/* 288 */ YY_NOT_ACCEPT,
		/* 289 */ YY_NOT_ACCEPT,
		/* 290 */ YY_NOT_ACCEPT,
		/* 291 */ YY_NOT_ACCEPT,
		/* 292 */ YY_NOT_ACCEPT,
		/* 293 */ YY_NOT_ACCEPT,
		/* 294 */ YY_NOT_ACCEPT,
		/* 295 */ YY_NOT_ACCEPT,
		/* 296 */ YY_NOT_ACCEPT,
		/* 297 */ YY_NOT_ACCEPT,
		/* 298 */ YY_NOT_ACCEPT,
		/* 299 */ YY_NOT_ACCEPT,
		/* 300 */ YY_NOT_ACCEPT,
		/* 301 */ YY_NOT_ACCEPT,
		/* 302 */ YY_NOT_ACCEPT,
		/* 303 */ YY_NOT_ACCEPT,
		/* 304 */ YY_NOT_ACCEPT,
		/* 305 */ YY_NOT_ACCEPT,
		/* 306 */ YY_NOT_ACCEPT,
		/* 307 */ YY_NOT_ACCEPT,
		/* 308 */ YY_NOT_ACCEPT,
		/* 309 */ YY_NOT_ACCEPT,
		/* 310 */ YY_NOT_ACCEPT,
		/* 311 */ YY_NOT_ACCEPT,
		/* 312 */ YY_NOT_ACCEPT,
		/* 313 */ YY_NOT_ACCEPT
	};
	private int yy_cmap[] = unpackFromString(1,65538,
"44:9,37,36,44:2,37,44:18,37,44,40,44,46,44:2,42,25,26,33,31,35,32,39,34,52," +
"53,54,38,55,49,48,50:2,51,44,24,44:2,45,30,44,5,10,14,4,2,7,20,21,17,23,43," +
"8,13,11,6,16,22,3,9,15,12,1,43:2,18,43,27,41,28,44,19,44,5,10,14,4,2,7,20,2" +
"1,17,23,43,8,13,11,6,16,22,3,9,15,12,1,43:2,18,43,47,44,56,44:65,29,44:6534" +
"4,0:2")[0];

	private int yy_rmap[] = unpackFromString(1,314,
"0,1,2,1:8,3,1,4,1:2,5,6,1:4,7,1:2,8,1,9,10,1:7,11,12,13,1:20,14,1:14,15,16," +
"17,18,19,20,21,22,23,1,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,4" +
"1,42,43,44,45,46,47,48,49,50,51,52,53,9,10,54,55,56,57,58,59,60,61,62,63,64" +
",65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89" +
",90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110," +
"111,90,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128," +
"129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147" +
",148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,16" +
"6,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,1" +
"85,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203," +
"204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222" +
",223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,24" +
"1,242,243,244,245,246,247,248,249,250")[0];

	private int yy_nxt[][] = unpackFromString(251,57,
"1,2,75,237,278,77,79,81,83,85,87,89,83,91,93,83,95,97,83,99,83,101,83:2,3,4" +
",5,6,7,8,9,10,11,12,13,14,15,16,17,83,103,83,105,83:5,17:8,83,-1:59,74,-1:9" +
"9,20,-1:44,113,114,-1:59,16,-1:57,17,115,-1:8,17:8,-1:20,138,-1:56,146,-1:3" +
"8,27:35,-1,27:20,-1:38,28,-1:9,28:8,-1:20,183,-1:56,313,-1:56,188,-1:56,272" +
",-1:40,119,-1:62,76,-1,78,-1:11,80,-1:52,120,-1:48,84,-1:60,243,-1:44,18,-1" +
":15,86,-1:39,121,-1:59,88,-1:6,90,-1:4,92,-1:54,279,122,-1:44,21,-1:54,94,-" +
"1:14,19,-1:48,123,-1:53,96,-1:58,124,-1:54,98,-1:5,100,-1:55,245,-1:47,102," +
"-1:2,104,106,-1:10,241,-1:50,22,-1:50,107,108,-1:70,125,-1:41,238,240,-1:56" +
",126,-1:61,109,-1,110,-1:58,23,-1:42,111:18,-1,111:4,-1:14,111,-1:4,111,-1:" +
"4,111:8,-1:14,246,-1:48,112,-1:62,127,-1:3,248,-1:42,116:35,-1,116:3,-1,116" +
":16,-1:18,281,-1:39,117:18,-1,117:4,-1:19,117,-1:2,118,-1:14,24,-1:55,129,2" +
"80,-1:63,25,-1,130,-1:57,132,-1:2,307,-1:2,302,-1:52,251,-1:41,111:18,26,11" +
"1:4,-1:14,111,-1:4,111,-1:4,111:8,-1:10,133,-1:4,298,-1:43,244:33,-1,244:6," +
"-1,244:15,-1,116:35,-1,116:3,29,116:16,-1:42,30,-1:61,134,-1:13,250,-1:56,1" +
"35,-1:12,136,-1:53,247,-1:44,252,-1:71,31,-1:48,137,-1:59,139,-1:52,140,-1:" +
"54,141,-1:61,283,-1:50,144,-1:57,32,-1:55,33,-1:54,254,-1:68,147,-1:79,150," +
"-1:9,151,-1,152,153,-1,154,-1:20,155,-1:59,156,-1:42,34,-1:57,258,-1,161,-1" +
":3,162,-1:2,163,-1:51,35,-1:47,260,-1:57,36,-1:57,165,-1:55,37,-1:67,259,-1" +
":53,167,-1:46,287,-1:14,296,-1:45,38,-1:54,39,-1:54,244:32,149,40,244:6,-1," +
"244:15,-1:54,172,-1:50,172:4,-1:43,172,-1:9,172:8,-1:51,172:3,-1:52,173,-1:" +
"3,174:2,175,-1:9,303,-1:61,299,-1:59,300,-1:58,177,-1:58,262,-1:43,178,-1:5" +
"2,180,-1:14,41,-1:41,181,-1:14,288,-1:44,261,-1:57,42,-1:56,43,-1:53,184,-1" +
":58,44,-1:65,187,-1:55,308,-1:49,45,-1:59,266,-1:103,189,-1:49,172,-1:5,172" +
",-1:53,172:3,-1:4,267,-1:57,46,-1:64,47,-1:56,194,-1:65,195,-1:51,289,-1:52" +
",48,-1:51,198,-1:55,199,-1:59,201,-1:51,202,-1:70,203,-1:61,269,-1:76,49,-1" +
":22,50,-1:57,51,-1:50,52,-1:56,53,-1:67,208,-1:54,209,-1:55,211,-1:50,54,-1" +
":70,270,-1:46,55,-1:50,56,-1:59,212,-1:55,213,-1:56,57,-1:54,58,-1:56,59,-1" +
":59,60,-1:52,215,-1:71,216,-1:50,61,-1:49,217,-1:67,218,-1:44,62,-1:66,220," +
"-1:45,63,-1:65,222,-1:51,223,-1:56,64,-1:53,274,-1:73,224,-1:38,275,-1:59,2" +
"25,-1:66,227,-1:52,65,-1:57,276,-1:52,66,-1:56,67,-1:50,68,-1:59,277,-1:60," +
"69,-1:50,233,-1:61,70,-1:56,71,-1:54,235,-1:67,236,-1:48,72,-1:53,73,-1:52," +
"82,-1:57,131,-1:72,242,-1:52,292,-1:43,128,-1:62,293,-1:54,249,-1:51,244:32" +
",149,-1,244:6,-1,244:15,-1:14,253,-1:44,294,-1:66,157,-1:50,142,-1:61,256,-" +
"1:50,255,-1:54,295,-1:68,158,-1:58,160,-1:41,169,-1:58,176,-1:66,264,-1:53," +
"168,-1:57,179,-1:59,297,-1:46,182,-1:54,197,-1:67,265,-1:55,268,-1:45,191,-" +
"1:60,309,-1:55,204,-1:54,206,-1:70,205,-1:51,214,-1:61,219,-1:54,221,-1:52," +
"226,-1:48,228,-1:58,229,-1:66,230,-1:46,231,-1:54,234,-1:55,239,-1:60,282,-" +
"1:52,145,-1:60,143,-1:53,286,-1:68,166,-1:58,170,-1:41,171,-1:65,301,-1:50," +
"185,-1:53,196,-1:60,210,-1:53,207,-1:58,232,-1:53,257,-1:60,159,-1:53,164,-" +
"1:70,263,-1:44,186,-1:53,200,-1:56,148,-1:59,190,-1:56,192,-1:56,193,-1:54," +
"285,-1:55,290,-1:65,271,-1:60,273,-1:53,291,-1:58,284,-1:44,304,-1:65,305,-" +
"1:65,306,-1:53,310,-1:58,311,-1:43,312,-1:50");

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
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
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
						{System.out.println("se econtro un parentesis derecho"); return new Symbol(sym.parCerrado,yyline,yychar, yytext());}
					case -6:
						break;
					case 6:
						{System.out.println("se econtro un corchete izquierdo");  return new Symbol(sym.corAbrir,yyline,yychar, yytext());}
					case -7:
						break;
					case 7:
						{System.out.println("se econtro un corchete derecho"); return new Symbol(sym.corCerrar,yyline,yychar, yytext());}
					case -8:
						break;
					case 8:
						{System.out.println("se econtro un interrogante izquierdo"); return new Symbol(sym.interroganteIzquierdo,yyline,yychar, yytext());}
					case -9:
						break;
					case 9:
						{System.out.println("se econtro un interrogante derecho"); return new Symbol(sym.interroganteDerecho,yyline,yychar, yytext());}
					case -10:
						break;
					case 10:
						{System.out.println("se econtro un mas"); return new Symbol(sym.mas,yyline,yychar, yytext());}
					case -11:
						break;
					case 11:
						{System.out.println("se econtro un menos"); return new Symbol(sym.menos,yyline,yychar, yytext());}
					case -12:
						break;
					case 12:
						{System.out.println("se econtro un por"); return new Symbol(sym.por,yyline,yychar, yytext());}
					case -13:
						break;
					case 13:
						{System.out.println("se econtro un dividido"); return new Symbol(sym.dividido,yyline,yychar, yytext());}
					case -14:
						break;
					case 14:
						{System.out.println("se econtro una coma"); return new Symbol(sym.coma,yyline,yychar, yytext());}
					case -15:
						break;
					case 15:
						{yychar=1;}
					case -16:
						break;
					case 16:
						{}
					case -17:
						break;
					case 17:
						{System.out.println("se econtro un entero");  return new Symbol(sym.entero,yyline,yychar, yytext());}
					case -18:
						break;
					case 18:
						{System.out.println("se encontro la palabra reservada or"); return new Symbol(sym.or,yyline,yychar,yytext());}
					case -19:
						break;
					case 19:
						{System.out.println("se encontro la palabra reservada si"); return new Symbol(sym.si,yyline,yychar,yytext());}
					case -20:
						break;
					case 20:
						{System.out.println("se econtro una asignacion"); return new Symbol(sym.asignacionSimbolo,yyline,yychar, yytext());}
					case -21:
						break;
					case 21:
						{System.out.println("se encontro la palabra reservada and"); return new Symbol(sym.es_diferente,yyline,yychar,yytext());}
					case -22:
						break;
					case 22:
						{System.out.println("se encontro la palabra reservada fin"); return new Symbol(sym.fin,yyline,yychar,yytext());}
					case -23:
						break;
					case 23:
						{System.out.println("se encontro la palabra reservada not"); return new Symbol(sym.not,yyline,yychar,yytext());}
					case -24:
						break;
					case 24:
						{System.out.println("se encontro la palabra reservada mod"); return new Symbol(sym.mod,yyline,yychar,yytext());}
					case -25:
						break;
					case 25:
						{System.out.println("se encontro la palabra reservada con"); return new Symbol(sym.con,yyline,yychar,yytext());}
					case -26:
						break;
					case 26:
						{System.out.println("se econtro una variable"); return new Symbol(sym.variable,yyline,yychar, yytext());}
					case -27:
						break;
					case 27:
						{System.out.println("se econtro un comentarioLineal"); return new Symbol(sym.comentario_linea,yyline,yychar, yytext());}
					case -28:
						break;
					case 28:
						{System.out.println("se econtro un decimal"); return new Symbol(sym.decimal,yyline,yychar, yytext());}
					case -29:
						break;
					case 29:
						{System.out.println("se econtro una cadena"); return new Symbol(sym.valorcadena,yyline,yychar, yytext());}
					case -30:
						break;
					case 30:
						{System.out.println("se econtro un caracter"); return new Symbol(sym.valorcaracter,yyline,yychar, yytext());}
					case -31:
						break;
					case 31:
						{System.out.println("se encontro la palabra reservada o_si"); return new Symbol(sym.o_si,yyline,yychar,yytext());}
					case -32:
						break;
					case 32:
						{System.out.println("se encontro la palabra reservada como"); return new Symbol(sym.como,yyline,yychar,yytext());}
					case -33:
						break;
					case 33:
						{System.out.println("se encontro la palabra reservada para"); return new Symbol(sym.para,yyline,yychar,yytext());}
					case -34:
						break;
					case 34:
						{System.out.println("se encontro la palabra reservada Falso"); return new Symbol(sym.falso,yyline,yychar,yytext());}
					case -35:
						break;
					case 35:
						{System.out.println("se encontro la palabra reservada segun"); return new Symbol(sym.segun,yyline,yychar,yytext());}
					case -36:
						break;
					case 36:
						{System.out.println("se encontro la palabra reservada menor"); return new Symbol(sym.menor,yyline,yychar,yytext());}
					case -37:
						break;
					case 37:
						{System.out.println("se encontro la palabra reservada mayor"); return new Symbol(sym.mayor,yyline,yychar,yytext());}
					case -38:
						break;
					case 38:
						{System.out.println("se encontro la palabra reservada hasta"); return new Symbol(sym.hasta,yyline,yychar,yytext());}
					case -39:
						break;
					case 39:
						{System.out.println("se encontro la palabra reservada hacer"); return new Symbol(sym.hacer,yyline,yychar,yytext());}
					case -40:
						break;
					case 40:
						{System.out.println("se econtro un comentario Multilinea"); return new Symbol(sym.comentario_multilinea,yyline,yychar, yytext());}
					case -41:
						break;
					case 41:
						{System.out.println("se encontro la palabra reservada fin_si"); return new Symbol(sym.fin_si,yyline,yychar,yytext());}
					case -42:
						break;
					case 42:
						{System.out.println("se encontro la palabra reservada Numero"); return new Symbol(sym.numero,yyline,yychar,yytext());}
					case -43:
						break;
					case 43:
						{System.out.println("se encontro la palabra reservada metodo"); return new Symbol(sym.metodo,yyline,yychar,yytext());}
					case -44:
						break;
					case 44:
						{System.out.println("se encontro la palabra reservada Cadena"); return new Symbol(sym.cadena,yyline,yychar,yytext());}
					case -45:
						break;
					case 45:
						{System.out.println("se encontro la palabra reservada inicio"); return new Symbol(sym.inicio,yyline,yychar,yytext());}
					case -46:
						break;
					case 46:
						{System.out.println("se encontro la palabra reservada repetir"); return new Symbol(sym.repetir,yyline,yychar,yytext());}
					case -47:
						break;
					case 47:
						{System.out.println("se encontro la palabra reservada funcion"); return new Symbol(sym.funcion,yyline,yychar,yytext());}
					case -48:
						break;
					case 48:
						{System.out.println("se encontro la palabra reservada Boolean"); return new Symbol(sym.booleano,yyline,yychar,yytext());}
					case -49:
						break;
					case 49:
						{System.out.println("se econtro un caracter ascii"); return new Symbol(sym.caracter_ascii,yyline,yychar, yytext());}
					case -50:
						break;
					case 50:
						{System.out.println("se encontro la palabra reservada es_igual"); return new Symbol(sym.es_igual,yyline,yychar,yytext());}
					case -51:
						break;
					case 51:
						{System.out.println("se encontro la palabra reservada entonces"); return new Symbol(sym.entonces,yyline,yychar,yytext());}
					case -52:
						break;
					case 52:
						{System.out.println("se encontro la palabra reservada ejecutar"); return new Symbol(sym.ejecutar,yyline,yychar,yytext());}
					case -53:
						break;
					case 53:
						{System.out.println("se encontro la palabra reservada retornar"); return new Symbol(sym.retornar,yyline,yychar,yytext());}
					case -54:
						break;
					case 54:
						{System.out.println("se encontro la palabra reservada fin_para"); return new Symbol(sym.fin_para,yyline,yychar,yytext());}
					case -55:
						break;
					case 55:
						{System.out.println("se encontro la palabra reservada mientras"); return new Symbol(sym.mientras,yyline,yychar,yytext());}
					case -56:
						break;
					case 56:
						{System.out.println("se encontro la palabra reservada Caracter"); return new Symbol(sym.caracter,yyline,yychar,yytext());}
					case -57:
						break;
					case 57:
						{System.out.println("se encontro la palabra reservada potencia"); return new Symbol(sym.potencia,yyline,yychar,yytext());}
					case -58:
						break;
					case 58:
						{System.out.println("se encontro la palabra reservada ingresar"); return new Symbol(sym.ingresar,yyline,yychar,yytext());}
					case -59:
						break;
					case 59:
						{System.out.println("se encontro la palabra reservada imprimir"); return new Symbol(sym.imprimir,yyline,yychar,yytext());}
					case -60:
						break;
					case 60:
						{System.out.println("se encontro la palabra reservada Verdadero"); return new Symbol(sym.verdadero,yyline,yychar,yytext());}
					case -61:
						break;
					case 61:
						{System.out.println("se encontro la palabra reservada fin_segun"); return new Symbol(sym.fin_segun,yyline,yychar,yytext());}
					case -62:
						break;
					case 62:
						{System.out.println("se encontro la palabra reservada con_valor"); return new Symbol(sym.con_valor,yyline,yychar,yytext());}
					case -63:
						break;
					case 63:
						{System.out.println("se encontro la palabra reservada hasta_que"); return new Symbol(sym.hasta_que,yyline,yychar,yytext());}
					case -64:
						break;
					case 64:
						{System.out.println("se encontro la palabra reservada fin_metodo"); return new Symbol(sym.fin_metodo,yyline,yychar,yytext());}
					case -65:
						break;
					case 65:
						{System.out.println("se encontro la palabra reservada fin_funcion"); return new Symbol(sym.fin_funcion,yyline,yychar,yytext());}
					case -66:
						break;
					case 66:
						{System.out.println("se encontro la palabra reservada incremental"); return new Symbol(sym.incremental,yyline,yychar,yytext());}
					case -67:
						break;
					case 67:
						{System.out.println("se encontro la palabra reservada imprimir_nl"); return new Symbol(sym.imprimir_nl,yyline,yychar,yytext());}
					case -68:
						break;
					case 68:
						{System.out.println("se encontro la palabra reservada es_diferente"); return new Symbol(sym.es_diferente,yyline,yychar,yytext());}
					case -69:
						break;
					case 69:
						{System.out.println("se encontro la palabra reservada fin_mientras"); return new Symbol(sym.fin_mientras,yyline,yychar,yytext());}
					case -70:
						break;
					case 70:
						{System.out.println("se encontro la palabra reservada menor_o_igual"); return new Symbol(sym.menor_o_igual,yyline,yychar,yytext());}
					case -71:
						break;
					case 71:
						{System.out.println("se encontro la palabra reservada mayor_o_igual"); return new Symbol(sym.mayor_o_igual,yyline,yychar,yytext());}
					case -72:
						break;
					case 72:
						{System.out.println("se encontro la palabra reservada con_parametros"); return new Symbol(sym.con_parametros,yyline,yychar,yytext());}
					case -73:
						break;
					case 73:
						{System.out.println("se encontro la palabra reservada de_lo_contrario"); return new Symbol(sym.de_lo_contrario,yyline,yychar,yytext());}
					case -74:
						break;
					case 75:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -75:
						break;
					case 77:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -76:
						break;
					case 79:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -77:
						break;
					case 81:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -78:
						break;
					case 83:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -79:
						break;
					case 85:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -80:
						break;
					case 87:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -81:
						break;
					case 89:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -82:
						break;
					case 91:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -83:
						break;
					case 93:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -84:
						break;
					case 95:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -85:
						break;
					case 97:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -86:
						break;
					case 99:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -87:
						break;
					case 101:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -88:
						break;
					case 103:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -89:
						break;
					case 105:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -90:
						break;
					case 237:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -91:
						break;
					case 278:
						{
    System.out.println("Este es un error lexico: "+yytext()+
    ", en la linea: "+yyline+", en la columna: "+yychar);
    ArrayList<String> errores = new ArrayList<String>();
                errores.add(yytext());
                errores.add(String.valueOf(yyline));
                errores.add(String.valueOf(yychar));
                Main.errores.add(errores);
}
					case -92:
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
