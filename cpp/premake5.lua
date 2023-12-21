---@diagnostic disable: undefined-global

workspace("AdventOfCode")
configurations({ "Debug", "Release" })
location("build")

for _, yearPath in ipairs(os.matchdirs("src/20*")) do
	local year = yearPath:gsub("src/", "")
	for _, dayPath in ipairs(os.matchdirs("src/" .. year .. "/*")) do
		local day = dayPath:gsub(yearPath .. "/", "")
		local path = year .. "/" .. day
		project(year .. "Day" .. day)
		kind("ConsoleApp")
		language("C++")
		cppdialect("C++latest")
		targetdir("bin/%{cfg.buildcfg}")
		files({
			"src/" .. path .. "/**.h",
			"src/" .. path .. "/**.cpp",
			"src/utils/**.h",
			"src/utils/**.cpp",
		})

		filter("configurations:Debug")
		defines({ "DEBUG" })
		symbols("On")

		filter("configurations:Release")
		defines({ "NDEBUG" })
		optimize("On")
	end
end
