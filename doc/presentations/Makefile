# veripeditus-server - Presentational material - build system
# Copyright (C) 2017  Dominik George <nik@naturalnet.de>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

%.pdf: %.tex beamerthemeveripeditus.sty background.png
	pdflatex "$<"
	pdflatex "$<"

clean:
	rm -f *.aux *.log *.nav *.out *.snm *.toc

mrproper: clean
	rm -f *.pdf

.PHONY: clean mrproper
