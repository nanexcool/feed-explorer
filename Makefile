export SOLC_FLAGS=--optimize

all: build copy
build:; cd lib/ds-feeds && make all && dapp bind
copy:; cp lib/ds-feeds/build/dapp.js src/vendor/ds-feeds.js
clean:; rm -r lib/ds-feeds/build lib/ds-feeds/out
