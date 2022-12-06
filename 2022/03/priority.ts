const createChar2PriorityMap = () => {
  const map: Record<string, number> = {};
  for (let i = "a".charCodeAt(0), j = 1; i <= "z".charCodeAt(0); i++, j++) {
    map[String.fromCharCode(i)] = j;
  }
for (let i = "A".charCodeAt(0), j = 27; i <= "Z".charCodeAt(0); i++, j++) {
    map[String.fromCharCode(i)] = j;
  }
  return map;
};

export const char2PriorityMap = createChar2PriorityMap();
