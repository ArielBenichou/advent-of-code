#include "MapRange.h"

long long MapRange::map(long long val) const {
  long long offset = -1 * (src - val);
  if (offset >= len || offset < 0)
    return -1;
  return dst + offset;
}
